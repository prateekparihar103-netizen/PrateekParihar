  # Prateek Parihar — Portfolio

A static, multi-page portfolio built with **React 19 + TypeScript + Vite**, **Tailwind CSS v4** and **Framer Motion**.
The design system (palette, type pairing, UX checklist) comes from **UI/UX Pro Max**. The expandable project cards follow the
**21st.dev** expandable-card pattern, built natively with Framer Motion shared layout.

## Run it

```bash
npm install
npm run dev       # local dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Edit content

Every word on the site lives in **`src/data/resume.ts`** — projects, timeline, skills, certifications, stats.
Edit that file; components render from it. Replace `public/photo.jpg` to change the portrait.

## Structure

```
src/
├─ data/resume.ts          single source of truth for all content
├─ theme/                  light/dark ThemeProvider, context, useTheme hook
├─ motion/presets.ts       shared animation variants & easing
├─ lib/                    accent-colour class maps, nav links, cn()
├─ components/
│  ├─ Navbar, Footer, ThemeToggle, Page, Primitives, CountUp, RotatingWord, BrandIcons
│  ├─ home/                HeroBackdrop, PortraitCard (3D tilt), Pillars (interactive Venn)
│  └─ projects/            ProjectCard, ProjectDetail (dialog), ArchitectureFlow
└─ pages/                  Home · Journey · Projects · Skills · Contact
```

## Notes

- **Routing:** `HashRouter` (`/#/projects`) so deep links work on any static host with no rewrite rules.
- **Deep links to projects:** `/#/projects?p=rera-chatbot` opens that project's dialog directly.
- **Theme:** follows the OS until the visitor toggles; the choice is saved in `localStorage`. An inline script in
  `index.html` applies it before first paint (no flash).
- **Accessibility:** honours `prefers-reduced-motion` (via `MotionConfig`), visible focus rings, 44px touch targets,
  labelled form fields, focus-trapped dialog with Escape-to-close, skip link.
- **Contact form is simulated.** It validates and animates but sends nothing. To make it live, replace
  `simulateSend` in `src/pages/Contact.tsx` with a call to Formspree / Web3Forms / a serverless function.

## Deploy

**Vercel:** import the repo → framework preset “Vite” → deploy. No config needed.

**GitHub Pages:** push this folder as the repo root, then Settings → Pages → Source: **GitHub Actions**.
`.github/workflows/deploy.yml` builds and publishes on every push to `main`. `base: './'` in `vite.config.ts`
makes the same build work at `username.github.io/<any-repo-name>/`.
