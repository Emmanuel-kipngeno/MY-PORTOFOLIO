# Emmanuel Kipngeno — Portfolio

Professional portfolio for **Emmanuel Kipngeno**, System Administrator.
Dark, terminal-inspired design built with **React 19 + Vite 8 + Tailwind CSS 4**.

- Zero runtime dependencies beyond React
- No client-side router, no state library, no icon library
- Print stylesheet that renders the page as a clean one-page CV
- Full SEO / Open Graph / Twitter Card / JSON-LD metadata
- 65-assertion render smoke test

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173/portfolio/
```

| Script               | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Dev server with HMR                                       |
| `npm run build`      | Production build to `dist/`                               |
| `npm run preview`    | Serve the production build locally                        |
| `npm run lint`       | ESLint (flat config) over `src/` and `scripts/`           |
| `npm run test:smoke` | Render the whole tree to a string and assert key content  |
| `npm run og`         | Regenerate `public/og-image.png` (requires Python + Pillow) |

---

## Editing content

**All copy lives in one file: [`src/data/profile.js`](src/data/profile.js).**
Name, contact details, summary, skills, projects, experience, education,
certifications and achievements are all plain data objects — you never need to
touch a component to change text.

```js
export const projects = [
  {
    id: 'my-project',
    name: 'Project name',
    kicker: 'Full-Stack · API',      // small mono label above the title
    period: 'Jan 2026 – Jun 2026',
    role: 'Your role',
    summary: 'One or two sentences on what it does.',
    highlights: ['Outcome one', 'Outcome two'],
    stack: ['React', 'Node', 'Postgres'],
    links: [{ label: 'Live site', href: 'https://…' }],
    featured: true,
  },
]
```

A project with `links: []` simply renders without the link row.

---

## ⚠️ Content to verify before going live

These were **inferred from your CV** because the CV had no projects section.
Check them and correct anything that is not accurate:

1. **Project tech stacks** — `stack` arrays in `src/data/profile.js` only name
   tools already mentioned on your CV, deliberately. Add the real languages and
   services you actually used.
2. **Project links** — `links` is empty for all three. Add live URLs and repos.
3. **Third project** ("Administration & Hardening Routines") is a composite of
   your recurring sysadmin duties rather than a single named project. If you
   have a real repo, script collection or homelab, use that instead — a
   reviewer will take a named project more seriously than a described routine.
4. **GitHub profile** — [`github.com/Emmanuel-kipngeno`](https://github.com/Emmanuel-kipngeno)
   is linked in the hero, footer, contact section and JSON-LD. Make sure it
   exists and has pinned repositories and a README.
5. **LinkedIn** — not on your CV, so it is not on the site. A LinkedIn URL is
   the single highest-value addition for recruiter traffic. Add it to
   `socials` in `src/data/profile.js` and the `socials` array in
   `index.html` (for `sameAs`).

---

## Deployment

### GitHub Pages (already configured)

The repo contains [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which lints, builds and publishes `dist/` to GitHub Pages on every push to
`main`.

1. Push this folder to a GitHub repo (e.g. `github.com/Emmanuel-kipngeno/portfolio`).
2. **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
3. Enable Actions for the repo if prompted.
4. The site goes live at `https://<user>.github.io/portfolio/`.

`vite.config.js` sets `base: '/portfolio/'` to match the project-page URL.

### Custom domain

When you get a real domain, update these four places:

| What                     | Where                                                  |
| ------------------------ | ------------------------------------------------------ |
| Asset base path          | `vite.config.js` → `base: '/'`                        |
| Canonical + OG/Twitter URL | `index.html` (4 tags)                                |
| JSON-LD `url` / `image`  | `index.html` (`<script type="application/ld+json">`)   |
| `robots.txt` / `sitemap.xml` | `public/`                                        |

### Netlify / Vercel / Cloudflare Pages

Build command `npm run build`, publish directory `dist`. These serve from the
domain root, so set `base: '/'` in `vite.config.js` first.

---

## Contact form

The form validates entirely in the browser, then opens the visitor's email
client with the message pre-filled via a `mailto:` link. **There is no
backend** — nothing is submitted to or stored by any third party, and it works
with zero configuration.

Validation rules live in `validate()` at the top of
[`src/components/Contact.jsx`](src/components/Contact.jsx):

| Field     | Rule                                                   |
| --------- | ------------------------------------------------------ |
| Name      | required, 2–80 characters                              |
| Email     | required, must match a permissive email pattern        |
| Subject   | optional, ≤ 120 characters                             |
| Message   | required, 20–2000 characters                           |

Errors render inline with `role="alert"`, are wired up with
`aria-invalid` / `aria-describedby`, and focus moves to the first invalid
field on submit. Fields only start validating after their first blur, so you
are not shown an error while typing the first character.

If you later want the form to send mail directly, the cleanest upgrade is
[Formspree](https://formspree.io) — it needs no backend, and you would replace
the `window.location.href = buildMailto(values)` line with a `fetch` POST.

---

## Printing as a CV

`Ctrl/Cmd + P` (or the **Print this page** link in the footer) produces a clean
white A4 CV. The print stylesheet in [`src/index.css`](src/index.css) drops the
nav, footer, hero terminal, CTA buttons and the contact form, hides the numbered
section eyebrows, and forces light-on-white colours.

---

## Project structure

```
├── index.html                  # SEO, Open Graph, Twitter cards, JSON-LD, fonts
├── vite.config.js              # base path + build config
├── eslint.config.js            # flat config
├── public/
│   ├── emmanuel-kipngeno-cv.pdf # served at /portfolio/emmanuel-kipngeno-cv.pdf
│   ├── og-image.png            # 1200×630 social share card
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── smoke.jsx               # render smoke test (65 assertions)
│   └── generate_og_image.py    # regenerates the OG image
└── src/
    ├── main.jsx
    ├── App.jsx                 # section composition
    ├── index.css               # @theme tokens, components, print stylesheet
    ├── data/
    │   └── profile.js          # ← all content lives here
    ├── hooks/
    │   ├── useScrollSpy.js     # active nav section
    │   ├── useReveal.js        # fade/slide in on scroll
    │   └── useEnter.js         # fade in on mount (hero)
    └── components/
        ├── Icons.jsx           # inline SVG set, no icon dependency
        ├── Nav.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Education.jsx
        ├── Certifications.jsx # certifications + achievements
        ├── Contact.jsx
        ├── Footer.jsx
        ├── Section.jsx
        └── Reveal.jsx
```

---

## Design system

Tokens are defined CSS-first in Tailwind 4's `@theme` block in
`src/index.css` — change a value there and the whole site follows.

| Token group | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| `ink-950…500` | Surfaces, borders, card backgrounds                 |
| `accent-200…700` | Primary teal — CTAs, links, focus rings          |
| `aqua-300…500` | Secondary cyan — supporting accents               |
| `signal-300…500` | Amber — awards and highlights                     |
| `body` / `muted` / `faint` | Text hierarchy, three levels                 |
| `font-sans` / `font-display` / `font-mono` | Inter / Space Grotesk / JetBrains Mono |

Components layer: `.panel` (frosted card), `.panel-hover` (lift + accent border),
`.eyebrow` (small mono label), `.text-gradient` (gradient heading text),
`.link-underline` (animated underline), `.grid-bg`, `.glow-accent`.

### Accessibility

- Skip-to-content link, single `<h1>`, logical heading order
- Visible `:focus-visible` rings on every interactive element
- Decorative SVGs marked `aria-hidden="true"`
- Scroll reveals use `IntersectionObserver` and are switched off under
  `prefers-reduced-motion` — content is never left at `opacity: 0`
- Mobile menu traps `overflow`, closes on `Escape`, and locks body scroll
- Colour contrast meets WCAG AA against the `#05080f` background

### Performance

- Single JS bundle, no code splitting needed at this size
- Self-hosted icon set — no icon CDN request
- Google Fonts loaded with `preconnect` + `display=swap`
- Reveals use CSS transitions on a single attribute change, driven by one
  shared observer per element

---

## License

MIT.
