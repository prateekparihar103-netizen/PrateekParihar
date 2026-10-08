/**
 * Collapsed project card. Shares a `layoutId` with ProjectDetail so the
 * card physically expands into the dialog (21st.dev "expandable card"
 * pattern, implemented natively with Framer Motion shared layout).
 */
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Project } from '../../data/resume'
import { accent, cn, pillarLabel } from '../../lib/accent'
import { Dot } from '../Primitives'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const main = project.pillars[0]
  return (
    <motion.button
      type="button"
      layoutId={`card-${project.slug}`}
      onClick={onOpen}
      aria-haspopup="dialog"
      className={cn(
        'group flex h-full w-full cursor-pointer flex-col rounded-3xl border border-line bg-surface p-6 text-left transition-colors duration-300 sm:p-7',
        accent[main].hoverBorder,
      )}
      style={{ borderRadius: 24 }}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          {project.pillars.map((p) => (
            <Dot key={p} tone={p} />
          ))}
          {project.pillars.map((p) => pillarLabel[p]).join(' · ')}
        </span>
        <span className="grid size-8 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-90 group-hover:border-ink/40 group-hover:text-ink">
          <Plus size={16} aria-hidden="true" />
        </span>
      </div>

      <motion.h3 layoutId={`title-${project.slug}`} className="mt-6 font-display text-2xl tracking-tight sm:text-3xl">
        {project.title}
      </motion.h3>
      <p className="mt-1 font-mono text-xs text-muted">{project.kicker}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-6 grid w-full grid-cols-3 gap-3 border-t border-line pt-5">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <p className={cn('font-display text-xl leading-tight sm:text-2xl', accent[main].text)}>{m.value}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">{m.label}</p>
          </div>
        ))}
      </div>
      <span className="sr-only">Open details for {project.title}</span>
    </motion.button>
  )
}
