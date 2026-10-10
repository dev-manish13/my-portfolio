# manish.dev — Personal Portfolio

Live URL: https://kandelmanish.com.np

A clean, minimalist developer portfolio and technical blog built with Next.js (App Router) and Tailwind CSS. Designed with a high-contrast, editorial aesthetic inspired by Linear and shadcn/ui.

---

## Tech Stack

- Framework: Next.js (App Router, React 19)
- Styling: Tailwind CSS
- Icons: Lucide React
- Form Handling: Web3Forms
- Typography: Geist & Geist Mono
- Hosting: Vercel / Cloudflare Pages

---

## Features

- Multi-Page Architecture: Dedicated routes for `/projects`, `/blog`, `/contact`, and `/resume`.
- Technical Writing: Embedded case studies covering Python scraping, priority queues, and bot automation.
- Theme Support: Dark mode by default with a seamless light mode toggle.
- Working Contact Form: Client-side asynchronous form dispatching directly to email with zero redirects.
- Production SEO: Dynamic sitemap generation, OpenGraph social cards, and robots.txt.
- Document Viewer: Clean PDF resume viewer with direct browser preview and download options.

---

## Local Development

### Prerequisites

- Node.js 18.x or later
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   git clone https://github.com/dev-manish13/my-portfolio.git
   cd my-portfolio

2. Install dependencies:
   npm install

3. Setup environment variables:
   cp .env.example .env.local
   Add your Web3Forms access key inside .env.local:
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your-access-key-here"

4. Start the local server:
   npm run dev

Open http://localhost:3000 to view the application.

---

## Author

Manish Kandel
- Website: https://kandelmanish.com.np
- GitHub: https://github.com/dev-manish13
- Email: manishkandel.co@gmail.com

---

## License

MIT License.
