import { H2, P, Code, Pre } from "@/components/posts/prose";

export default function AntiBotPost() {
  return (
    <div>
      <P>
        Most scraping tutorials stop at &ldquo;set a realistic <Code>User-Agent</Code>.&rdquo;
        That stopped working years ago. Modern bot-management layers score a request long before
        your headers are read: at the TLS handshake, during JavaScript execution, and across the
        timing of the requests themselves. This post walks through the three layers that mattered
        most when I built price-tracking pipelines, and what actually helped at each one.
      </P>
      <P>
        One note before the code: everything here is about reading publicly available pages
        politely. Check <Code>robots.txt</Code> and the site&apos;s terms first, prefer an official
        API when one exists, and never use these techniques against login walls or personal data.
      </P>

      <H2>1. The handshake gives you away: TLS and JA3 fingerprints</H2>
      <P>
        Before a single HTTP header is sent, the client and server negotiate TLS. The list of
        cipher suites, extensions and elliptic curves your client offers, and the order it offers
        them in, is surprisingly distinctive. JA3 hashes those fields into one string. Python&apos;s{" "}
        <Code>requests</Code> (via OpenSSL and urllib3) produces a fingerprint that looks nothing
        like Chrome&apos;s, so a request claiming to be Chrome in its headers but speaking
        &ldquo;Python&rdquo; in its handshake is an easy flag.
      </P>
      <P>
        The fix is to make the handshake match the browser you claim to be. The{" "}
        <Code>curl_cffi</Code> library wraps <Code>curl-impersonate</Code> and exposes a
        requests-style API:
      </P>
      <Pre lang="python">{`from curl_cffi import requests

# Handshake (JA3/HTTP2 settings) and default headers now match recent Chrome.
session = requests.Session(impersonate="chrome")

resp = session.get(
    "https://example-shop.com/products/42",
    timeout=20,
)
resp.raise_for_status()
print(resp.status_code, len(resp.text))`}</Pre>
      <P>
        Two practical rules. Use a <Code>Session</Code> so cookies and connection reuse look like a
        real visit, and don&apos;t override headers piecemeal. A Chrome handshake paired with a
        hand-written Firefox <Code>User-Agent</Code> is a worse mismatch than the default you
        started with. If you need to rotate proxies, pass them per session so each identity keeps
        a consistent fingerprint:
      </P>
      <Pre lang="python">{`session = requests.Session(
    impersonate="chrome",
    proxies={"https": "http://user:pass@proxy.example:8000"},
)`}</Pre>

      <H2>2. When the page needs JavaScript: stealth Playwright</H2>
      <P>
        Plenty of storefronts render prices client-side or run a JavaScript challenge before
        serving content. A plain HTTP client can&apos;t pass those, so you drive a real browser.
        Default headless automation has its own tells, such as{" "}
        <Code>navigator.webdriver === true</Code>, a missing language list and a default viewport.
        Start by making the browser context look like an ordinary user&apos;s:
      </P>
      <Pre lang="python">{`from playwright.sync_api import sync_playwright

BLOCKED = {"image", "media", "font"}

def block_heavy(route):
    # Skip assets we never read; fewer requests, faster pages, less noise.
    if route.request.resource_type in BLOCKED:
        route.abort()
    else:
        route.continue_()

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--disable-blink-features=AutomationControlled"],
    )
    context = browser.new_context(
        viewport={"width": 1366, "height": 768},
        locale="en-US",
        timezone_id="Asia/Kathmandu",
    )
    page = context.new_page()
    page.route("**/*", block_heavy)

    page.goto("https://example-shop.com/products/42", wait_until="domcontentloaded")
    page.wait_for_selector(".price")
    print(page.inner_text(".price"))
    browser.close()`}</Pre>
      <P>
        Blocking images, media and fonts is the quiet win here. Product pages often pull dozens of
        megabytes of assets you never parse, so aborting them cuts load time and bandwidth
        dramatically. Be careful not to block scripts or XHR the page needs to render the data you
        want. And watch for pages that fingerprint on the <em>absence</em> of assets: if a site
        starts serving challenges after you block images, let those through for that domain.
      </P>
      <P>
        A better trick than stealth, when it works: open the browser&apos;s network tab and look
        for the JSON endpoint the page itself calls. Hitting that with{" "}
        <Code>curl_cffi</Code> is faster and sturdier than rendering anything.
      </P>

      <H2>3. Behaviour over time: rate jitter discipline</H2>
      <P>
        Even a perfect fingerprint fails if you request a page every 2.000 seconds for six hours.
        Machine-regular timing is one of the oldest signals, and hammering a small shop is also
        just rude. Three habits fixed most of my blocks:
      </P>
      <ul className="mb-6 list-disc space-y-2 pl-5 leading-7 text-text-muted marker:text-border">
        <li>
          <strong className="text-foreground">Randomise delays</strong> instead of sleeping a fixed
          interval.
        </li>
        <li>
          <strong className="text-foreground">Back off exponentially</strong> on 429 and 5xx
          responses, and honour <Code>Retry-After</Code> when it is sent.
        </li>
        <li>
          <strong className="text-foreground">Limit per domain</strong>, not globally, so one slow
          target doesn&apos;t starve the rest and no single host sees a burst.
        </li>
      </ul>
      <Pre lang="python">{`import random
import time

from curl_cffi import requests

def polite_get(session, url, max_retries=4):
    for attempt in range(max_retries):
        time.sleep(random.uniform(2.0, 6.0))  # jitter between every request
        resp = session.get(url, timeout=20)

        if resp.status_code in (429, 503):
            retry_after = resp.headers.get("Retry-After")
            wait = float(retry_after) if retry_after and retry_after.isdigit() \\
                else (2 ** attempt) * 5 + random.uniform(0, 3)
            time.sleep(wait)
            continue

        resp.raise_for_status()
        return resp

    raise RuntimeError(f"Gave up on {url} after {max_retries} attempts")`}</Pre>
      <P>
        If a site keeps blocking you after all of this, treat it as a signal. It may not want to
        be scraped, and the right move is to stop or ask for access, not to escalate.
      </P>

      <H2>Putting it together</H2>
      <P>
        My default order is: look for an API or JSON endpoint, then{" "}
        <Code>curl_cffi</Code> with a consistent browser identity, then Playwright only for pages
        that truly need JavaScript, with jittered, rate-limited requests throughout. Each step up
        costs more CPU and more complexity, so only climb when the cheaper layer fails. Most
        targets never get past the first rung.
      </P>
    </div>
  );
}
