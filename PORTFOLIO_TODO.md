# Portfolio TODO

Checklist of assets and links to finish before launch. The site works and builds fine
without any of these — each one has a graceful fallback — but replacing them makes the
site feel finished.

## Assets

- [ ] **`public/resume.pdf`** — Add your resume PDF here. Until it exists, every
      "Resume" button opens a modal with a "not available yet" placeholder
      (see [`components/ResumeModal.jsx`](components/ResumeModal.jsx)).
- [ ] **`public/profile.jpg`** — Add a profile photo here. Until it exists, the
      avatar falls back to an "MK" initials badge
      (see [`components/Avatar.jsx`](components/Avatar.jsx)).
- [ ] **Favicon** — Replace `app/favicon.ico` with a custom one.
- [ ] **OG / social preview image** — Add an `opengraph-image.png` under `app/` so
      links shared on social media show a proper preview card.

## Links & content

- [ ] **Social links** — `data/profile.js` only wires up GitHub, email, and phone.
      Add LinkedIn, X/Twitter, personal blog, etc. to the `socialLinks` array.
- [ ] **Project links** — Confirm the `live` demo URLs in `data/projects.json`
      once each project has a deployed instance (currently `null`).
- [ ] **Metadata base URL** — `app/layout.js` sets `metadataBase` to
      `https://example.com` as a placeholder. Update it to your real production
      domain once deployed.

## Domain & deployment

- [ ] **Custom domain** — Point your domain at the Vercel (or other host)
      deployment and update `metadataBase` above to match.
- [ ] **Analytics** — Optionally wire up an analytics provider (e.g. Vercel
      Analytics, Plausible) in `app/layout.js`.

## Nice-to-haves

- [ ] Add more projects to `data/projects.json` as you ship them.
- [ ] Expand `data/skills.json` as your stack grows.
- [ ] Add a blog/writing section if you want one later.
