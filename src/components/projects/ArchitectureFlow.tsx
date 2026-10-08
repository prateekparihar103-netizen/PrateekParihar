/**
 * Renders a project's architecture as a vertical pipeline: numbered
 * nodes on a rail that draws itself in, each step fading in after it.
 * Vertical works at every width, so there's no separate mobile layout.
 */
import { motion } from 'framer-motion'
import type { ArchitectureStep, Pillar } from '../../data/resume'
import { accent, cn } from '../../lib/accent'
import { ease } from '../../motion/presets'

export function ArchitectureFlow({ steps, pillar }: { steps: ArchitectureStep[]; pillar: Pillar }) {
  const a = accent[pillar]
  return (
    <ol className="relative">
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4 + steps.length * 0.12, ease }}
        className={cn('absolute top-4 bottom-4 left-[15px] w-px origin-top', a.dot, 'opacity-40')}
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 + i * 0.1, duration: 0.4, ease }}
          className="relative flex gap-4 pb-5 last:pb-0"
        >
          <span
            className={cn(
              'relative z-10 grid size-8 shrink-0 place-items-center rounded-full border bg-surface font-mono text-xs',
              a.border,
              a.text,
            )}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pt-1">
            <p className="font-medium">{s.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
