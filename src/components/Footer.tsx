/** Site footer — repeats the social anchors so they're reachable from every page. */
import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../data/resume'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { navLinks } from '../lib/nav'
import { Container } from './Primitives'

const YEAR = new Date().getFullYear()

export function Footer() {
  const socials = [
    { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={18} /> },
    { href: profile.github, label: 'GitHub', icon: <GithubIcon size={18} /> },
    { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={18} aria-hidden="true" /> },
  ]

  return (
    <footer className="mt-32 border-t border-line">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl italic">Prateek Parihar</p>
          <p className="mt-1 text-sm text-muted">{profile.title} · {profile.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-ink/40 hover:text-ink"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="pb-10 font-mono text-xs text-muted">
        © {YEAR} Prateek Parihar · Built with React, Tailwind CSS & Framer Motion
      </Container>
    </footer>
  )
}
