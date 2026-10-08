/**
 * Shared Framer Motion presets so every animation on the site has the
 * same rhythm. Durations follow UI/UX Pro Max guidance: 150–300ms for
 * micro-interactions, ~600ms for scroll reveals. Only transform/opacity
 * are animated to keep everything on the compositor.
 */
import type { Variants } from 'framer-motion'

/** Smooth "expo-out" curve used site-wide. */
export const ease = [0.22, 1, 0.36, 1] as const

/** Reveal once, slightly before the element fully enters the viewport. */
export const viewportOnce = { once: true, margin: '-80px 0px' } as const

/** Fade + rise. Pass a delay (seconds) through `custom`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
}

/** Parent container that staggers its children's `show` variant. */
export const stagger = (step = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren } },
})

/** Route-level enter/exit. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease } },
}

/** Spring used for hover lifts and shared-layout card expansion. */
export const softSpring = { type: 'spring', stiffness: 260, damping: 30 } as const
