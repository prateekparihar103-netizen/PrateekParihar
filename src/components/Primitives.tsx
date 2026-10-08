/**
 * Small layout primitives shared by every page:
 *  - Container: one consistent max-width + side gutter.
 *  - Reveal: scroll-triggered fade-up wrapper.
 *  - SectionHeading: editorial "index / eyebrow / title" block.
 *  - Chip: compact tag pill.
 */
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Accent } from '../data/resume'
import { accent as accentMap, cn } from '../lib/accent'
import { fadeUp, viewportOnce } from '../motion/presets'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

/** Fades children up the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {index && <span className="text-ink">{index}</span>}
        {index && <span className="h-px w-8 bg-line" aria-hidden="true" />}
        {eyebrow}
      </p>
      <Tag className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
        {title}
      </Tag>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}

export function Chip({ children, tone = 'ink', className }: { children: ReactNode; tone?: Accent; className?: string }) {
  const a = accentMap[tone]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tone === 'ink' ? 'border-line text-muted' : cn(a.border, a.text, a.soft),
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Coloured dot used as a pillar marker; decorative only. */
export function Dot({ tone, className }: { tone: Accent; className?: string }) {
  return <span aria-hidden="true" className={cn('inline-block size-2 rounded-full', accentMap[tone].dot, className)} />
}
