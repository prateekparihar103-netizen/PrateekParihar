/**
 * Floating pill navigation.
 * - Active route gets a sliding background (shared `layoutId`).
 * - Below `md`, links collapse into an animated sheet that closes on navigation.
 * - Gains a shadow once the page is scrolled.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/accent'
import { navLinks } from '../lib/nav'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-surface/85 py-1.5 pr-1.5 pl-4 backdrop-blur-xl transition-shadow duration-300',
          scrolled && 'shadow-lg shadow-black/5 dark:shadow-black/40',
        )}
      >
        <Link to="/" onClick={() => setOpen(false)} className="group flex items-center gap-2.5 rounded-full" aria-label="Prateek Parihar — home">
          <span className="relative grid size-8 place-items-center rounded-full bg-ink font-display text-sm text-bg italic">
            pp
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">Prateek Parihar</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative block rounded-full px-4 py-2 text-sm transition-colors duration-200',
                    isActive ? 'text-bg' : 'text-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-line bg-surface/95 p-2 backdrop-blur-xl md:hidden"
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-base',
                        isActive ? 'bg-ink text-bg' : 'text-ink hover:bg-surface-2',
                      )
                    }
                  >
                    {l.label}
                    <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
