// lucide-react doesn't ship brand/logo icons (same reason GithubMark exists),
// so LinkedIn's mark is inlined here as a plain SVG.
export default function LinkedinMark({ className, size = 20, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.7A1.7 1.7 0 1 1 8.2 6a1.7 1.7 0 0 1-1.7 1.7ZM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3V9h2.9v1.3h.04a3.15 3.15 0 0 1 2.84-1.56c3 0 3.6 2 3.6 4.6V19Z" />
    </svg>
  );
}
