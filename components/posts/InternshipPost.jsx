import { H2, P, Code } from "@/components/posts/prose";

const Ul = ({ children }) => (
  <ul className="mb-6 list-disc space-y-2 pl-5 leading-7 text-text-muted marker:text-border">
    {children}
  </ul>
);
const B = ({ children }) => <strong className="text-foreground">{children}</strong>;

export default function InternshipPost() {
  return (
    <div>
      <P>
        Moving from personal sandbox projects to a live e-commerce catalog at Birgunj Bazar Pvt.
        Ltd. was an eye-opening transition. Working on real user-facing code changed how I think
        about frontend architecture.
      </P>

      <H2>1. Real Users Experience Network Latency</H2>
      <P>
        On local development, <Code>localhost:3000</Code> responds in 15ms. In real-world conditions
        with 3G/4G mobile networks across Nepal, catalog API endpoints can take 800ms to 2 seconds
        to return product data.
      </P>
      <Ul>
        <li>
          <B>Skeleton Loaders are Essential:</B> Blank white spaces make users think the app
          crashed. Implementing lightweight pulse skeletons prevents Cumulative Layout Shift (CLS)
          and keeps perceived performance high.
        </li>
        <li>
          <B>Optimistic UI Updates:</B> For cart increments and wishlist toggles, updating the UI
          immediately while the network request resolves in the background makes the app feel
          native and responsive.
        </li>
      </Ul>

      <H2>2. Component Reusability Requires Discipline</H2>
      <P>
        Early in the internship, it was tempting to copy-paste product cards and tweak them for
        different seasonal sections. By week four, fixing a single discount badge bug required
        editing five different files.
      </P>
      <Ul>
        <li>
          We refactored product cards into polymorphic primitives accepting clean variant props (
          <Code>variant=&quot;grid&quot; | &quot;compact&quot;</Code>).
        </li>
        <li>
          Centralizing data transformations into pure helper functions prevented catalog display
          inconsistencies.
        </li>
      </Ul>

      <H2>3. Empathy for the User</H2>
      <P>
        Building for production taught me that accessibility, clear error messages, and
        mobile-friendly tap targets matter just as much as clean code. Real software isn&apos;t
        defined by how clever the syntax looks—it&apos;s defined by how gracefully it handles edge
        cases for the person on the other side of the screen.
      </P>
    </div>
  );
}
