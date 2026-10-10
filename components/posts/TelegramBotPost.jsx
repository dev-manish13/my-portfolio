import { H2, P, Code, Pre } from "@/components/posts/prose";

export default function TelegramBotPost() {
  return (
    <div>
      <P>
        Building a personal Telegram bot that sends messages on your laptop is trivial. Keeping an
        alert bot running 24/7 without missing notifications or getting banned by Telegram&apos;s
        rate-limiter requires deliberate engineering.
      </P>

      <H2>1. Long Polling vs. Webhooks</H2>
      <P>
        For local development, long polling (<Code>getUpdates</Code>) is convenient. In production,
        webhooks running on a lightweight FastAPI server are far superior:
      </P>
      <ul className="mb-6 list-disc space-y-2 pl-5 leading-7 text-text-muted marker:text-border">
        <li>Zero idle CPU usage.</li>
        <li>Immediate event response time (&lt;100ms).</li>
        <li>Built-in HTTPS validation via Cloudflare or reverse proxies.</li>
      </ul>

      <H2>2. Managing Telegram Rate Limits (HTTP 429)</H2>
      <P>
        Telegram enforces rate limits: 30 messages per second across all chats, and 1 message per
        second to a single group or channel.
      </P>
      <P>
        When scrapers detect price drops across 50 items simultaneously, burst dispatching triggers
        HTTP 429 flood errors. We resolved this using an asynchronous bounded queue:
      </P>
      <Pre lang="python">{`import asyncio
from collections import deque

class RateLimitedDispatcher:
    def __init__(self, bot, rate_limit=1.0):
        self.bot = bot
        self.interval = rate_limit
        self.queue = deque()
        self.is_processing = False

    async def enqueue(self, chat_id, text):
        self.queue.append((chat_id, text))
        if not self.is_processing:
            asyncio.create_task(self._process_queue())

    async def _process_queue(self):
        self.is_processing = True
        while self.queue:
            chat_id, text = self.queue.popleft()
            try:
                await self.bot.send_message(chat_id=chat_id, text=text, parse_mode="HTML")
            except Exception as e:
                print(f"Failed to dispatch: {e}")
            await asyncio.sleep(self.interval)
        self.is_processing = False`}</Pre>
    </div>
  );
}
