/**
 * Projects — filterable grid of expandable project cards.
 *
 * The open project lives in the URL (?p=slug), so each deep-dive is
 * linkable/shareable, and the Skills and Home pages can
 * link straight into a specific project.
 */
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Page } from '../components/Page'
import { Container, Dot, Reveal, SectionHeading } from '../components/Primitives'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectDetail } from '../components/projects/ProjectDetail'
import { liveProjects, projects, projectBySlug, type Pillar } from '../data/resume'
import { cn } from '../lib/accent'
import { fadeUp, stagger, viewportOnce } from '../motion/presets'

const filters: { id: Pillar | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ai', label: 'GenAI & Agents' },
  { id: 'scm', label: 'Supply Chain' },
  { id: 'esg', label: 'Sustainability' },
]

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Pillar | 'all'>('all')
  const lastTrigger = useRef<HTMLElement | null>(null)

  const openSlug = params.get('p')
  const active = openSlug ? projectBySlug(openSlug) : undefined

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.pillars.includes(filter))),
    [filter],
  )

  const open = (slug: string) => {
    lastTrigger.current = document.activeElement as HTMLElement
    setParams({ p: slug }, { replace: true })
  }

  const close = useCallback(() => {
    setParams({}, { replace: true })
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => lastTrigger.current?.focus({ preventScroll: true }))
  }, [setParams])

  return (
    <Page title="Projects">
      <section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Deep-dive showcase"
            title={
              <>
                Systems I’ve <em className="text-ai">engineered</em>, end to end.
              </>
            }
            description="Open any card to see how it’s built — architecture, the stack behind it and the numbers it moved."
          />

          {/* Filter */}
          <Reveal delay={0.1} className="mt-10">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'relative flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200',
                    filter === f.id ? 'border-ink text-bg' : 'border-line text-muted hover:text-ink',
                  )}
                >
                  {filter === f.id && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  {f.id !== 'all' && <Dot tone={f.id} className="relative" />}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <LayoutGroup>
            <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={p} onOpen={() => open(p.slug)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            <AnimatePresence>{active && <ProjectDetail key={active.slug} project={active} onClose={close} />}</AnimatePresence>
          </LayoutGroup>
        </Container>
      </section>

      {/* Live consulting projects */}
      <section className="mt-24">
        <Container>
          <SectionHeading eyebrow="Live consulting projects" title="Strategy work from the MBA years." />
          <motion.ul
            className="mt-10 grid gap-4 md:grid-cols-2"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {liveProjects.map((lp) => (
              <motion.li key={lp.org} variants={fadeUp} className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <p className="flex items-center gap-2 font-mono text-xs text-muted">
                  <Dot tone={lp.pillar} /> {lp.period}
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-tight">{lp.org}</h3>
                <p className="text-sm font-medium">{lp.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lp.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>
    </Page>
  )
}
