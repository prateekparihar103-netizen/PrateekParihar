/**
 * Skills — a grouped matrix instead of a flat list.
 *
 * Each group is a card. Hovering, focusing or tapping a skill reveals
 * where it was applied, with links into the matching project dialogs.
 * No self-rated proficiency bars: evidence over adjectives.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../components/Page'
import { Container, Dot, Reveal, SectionHeading } from '../components/Primitives'
import { certifications, projectBySlug, skillGroups, type Skill, type SkillGroup } from '../data/resume'
import { accent, cn } from '../lib/accent'
import { fadeUp, stagger, viewportOnce } from '../motion/presets'

function SkillCluster({ group, index }: { group: SkillGroup; index: number }) {
  const [active, setActive] = useState<Skill | null>(null)
  const a = accent[group.accent]
  const applied = (active?.projects ?? []).map(projectBySlug).filter((p) => p !== undefined)

  return (
    <motion.section
      variants={fadeUp}
      aria-labelledby={`group-${group.id}`}
      className="flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8"
      onMouseLeave={() => setActive(null)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn('font-mono text-xs tracking-widest uppercase', a.text)}>0{index + 1}</p>
          <h2 id={`group-${group.id}`} className="mt-2 font-display text-3xl tracking-tight">
            {group.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{group.blurb}</p>
        </div>
        <span className={cn('mt-1 size-3 shrink-0 rounded-full', a.dot)} aria-hidden="true" />
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((s) => {
          const on = active?.name === s.name
          return (
            <li key={s.name}>
              <button
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setActive(s)}
                onFocus={() => setActive(s)}
                onClick={() => setActive(on ? null : s)}
                className={cn(
                  'flex min-h-11 cursor-pointer flex-col items-start rounded-2xl border px-3.5 py-2 text-left transition-colors duration-200',
                  on ? cn(a.border, a.soft) : 'border-line hover:border-ink/30',
                )}
              >
                <span className={cn('text-sm font-medium', on && a.text)}>{s.name}</span>
                {s.detail && <span className="text-[11px] text-muted">{s.detail}</span>}
              </button>
            </li>
          )
        })}
      </ul>

      {/* "Applied in" readout */}
      <div className="mt-auto pt-6">
        <div className="min-h-[4.5rem] rounded-2xl bg-surface-2 p-4" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active?.name ?? 'idle'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {!active && <p className="text-sm text-muted">Hover or tap a skill to see where it was applied.</p>}
              {active && applied.length === 0 && (
                <p className="text-sm text-muted">
                  <span className="font-medium text-ink">{active.name}</span> — part of the everyday toolkit across roles.
                </p>
              )}
              {active && applied.length > 0 && (
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-muted uppercase">{active.name} · applied in</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {applied.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/projects?p=${p.slug}`} className={cn('group inline-flex items-center gap-1 text-sm font-medium', a.text)}>
                          {p.title}
                          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default function Skills() {
  const oracle = certifications.filter((c) => c.issuer === 'Oracle')
  const other = certifications.filter((c) => c.issuer !== 'Oracle')

  return (
    <Page title="Skills">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Skills matrix"
          title={
            <>
              Platforms, code and the <em className="text-esg">domains</em> they serve.
            </>
          }
          description="Grouped the way the work actually combines them. Each skill links back to the projects where it was used."
        />

        <motion.div
          className="mt-14 grid gap-4 lg:grid-cols-2"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {skillGroups.map((g, i) => (
            <SkillCluster key={g.id} group={g} index={i} />
          ))}
        </motion.div>
      </Container>

      {/* Certifications */}
      <section className="mt-28">
        <Container>
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials, kept current."
            description="Oracle certifications across Generative AI, Vector Search and supply-chain cloud — earned while delivering client work — plus finance and sustainability coursework from Stanford, MIT and ASU."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {[
              { heading: 'Oracle', list: oracle },
              { heading: 'Sustainability, finance & product', list: other },
            ].map((col, ci) => (
              <Reveal key={col.heading} delay={ci * 0.1}>
                <h3 className="font-mono text-xs tracking-widest text-muted uppercase">{col.heading}</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {col.list.map((c) => (
                    <li key={c.name} className="flex items-start gap-3 py-4">
                      <BadgeCheck size={18} className={cn('mt-0.5 shrink-0', accent[c.pillar].text)} aria-hidden="true" />
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-snug">{c.name}</p>
                        <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                          <Dot tone={c.pillar} className="size-1.5" />
                          {c.issuer}
                          {c.date && <span>· {c.date}</span>}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </Page>
  )
}
