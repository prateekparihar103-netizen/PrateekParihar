/**
 * The three pillars as an interactive Venn diagram plus detail cards.
 * Hovering a card (or a circle) highlights the matching circle — the
 * point being that the value sits where the three overlap.
 */
import { motion } from 'framer-motion'
import { Boxes, Leaf, Sparkles, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { pillars, type Pillar } from '../../data/resume'
import { accent, cn } from '../../lib/accent'
import { fadeUp, stagger, viewportOnce } from '../../motion/presets'

const icons: Record<Pillar, LucideIcon> = { scm: Boxes, esg: Leaf, ai: Sparkles }

/** Circle geometry inside a 320×300 viewBox. */
const circles: { id: Pillar; cx: number; cy: number; lx: number; ly: number }[] = [
  { id: 'scm', cx: 118, cy: 118, lx: 84, ly: 98 },
  { id: 'esg', cx: 202, cy: 118, lx: 236, ly: 98 },
  { id: 'ai', cx: 160, cy: 190, lx: 160, ly: 248 },
]

function Venn({ active, onHover }: { active: Pillar | null; onHover: (p: Pillar | null) => void }) {
  return (
    <svg viewBox="0 0 320 300" className="w-full max-w-sm" role="img" aria-labelledby="venn-title">
      <title id="venn-title">Venn diagram: Supply Chain, ESG and GenAI overlap at the centre</title>
      {circles.map((c, i) => {
        const on = active === c.id
        return (
          <motion.circle
            key={c.id}
            cx={c.cx}
            cy={c.cy}
            r={82}
            style={{ fill: `var(--${c.id})`, stroke: `var(--${c.id})` }}
            strokeWidth={1.5}
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            animate={{ fillOpacity: on ? 0.28 : active ? 0.06 : 0.12, strokeOpacity: on ? 1 : 0.45 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            onMouseEnter={() => onHover(c.id)}
            onMouseLeave={() => onHover(null)}
            className="origin-center [transform-box:fill-box]"
          />
        )
      })}
      {circles.map((c) => (
        <text
          key={`${c.id}-label`}
          x={c.lx}
          y={c.ly}
          textAnchor="middle"
          className={cn('pointer-events-none font-mono text-[11px] font-medium tracking-widest uppercase', accent[c.id].fill)}
        >
          {pillars.find((p) => p.id === c.id)?.short}
        </text>
      ))}
      {/* The overlap — where the work lives. */}
      <circle cx={160} cy={143} r={4} className="fill-ink" />
      <text x={160} y={162} textAnchor="middle" className="pointer-events-none fill-ink font-display text-[13px] italic">
        the overlap
      </text>
    </svg>
  )
}

export function Pillars() {
  const [active, setActive] = useState<Pillar | null>(null)

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="lg:sticky lg:top-32">
        <Venn active={active} onHover={setActive} />
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
          Most consultants go deep in one of these. My work happens where they meet: ERP processes that run
          on AI agents and are measured against sustainability frameworks.
        </p>
      </div>

      <motion.ul
        className="grid gap-4"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {pillars.map((p) => {
          const Icon = icons[p.id]
          const a = accent[p.id]
          return (
            <motion.li
              key={p.id}
              variants={fadeUp}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 sm:p-8',
                a.hoverBorder,
              )}
            >
              {/* Oversized ghost index number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-4 font-display text-[7rem] leading-none text-ink/[0.04] transition-colors duration-300 group-hover:text-ink/[0.08]"
              >
                {p.index}
              </span>

              <div className="flex items-center gap-3">
                <span className={cn('grid size-10 place-items-center rounded-xl', a.soft, a.text)}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className={cn('font-mono text-xs tracking-widest uppercase', a.text)}>{p.platforms}</span>
              </div>

              <h3 className="mt-5 font-display text-2xl tracking-tight sm:text-3xl">{p.title}</h3>

              <ul className="mt-4 space-y-2.5">
                {p.proof.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className={cn('mt-2 size-1.5 shrink-0 rounded-full', a.dot)} />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
