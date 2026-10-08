/**
 * Journey — interactive career timeline.
 *
 * - A rail runs down the page; a coloured progress line fills it as you
 *   scroll (useScroll → scaleY).
 * - Desktop alternates cards left/right with the period on the opposite
 *   side; mobile stacks everything to the right of the rail.
 * - Each stop expands to reveal role-level tracks and achievements.
 */
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Award, Briefcase, ChevronDown, GraduationCap, MapPin } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { Page } from '../components/Page'
import { Chip, Container, Reveal, SectionHeading } from '../components/Primitives'
import { awards, profile, timeline, type TimelineEntry } from '../data/resume'
import { accent, cn } from '../lib/accent'
import { ease, fadeUp, stagger, viewportOnce } from '../motion/presets'

function TimelineCard({ entry, defaultOpen }: { entry: TimelineEntry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const a = accent[entry.pillar]
  const pointCount = entry.tracks.reduce((n, t) => n + t.points.length, 0)

  return (
    <div className={cn('rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 sm:p-7', a.hoverBorder)}>
      <p className={cn('font-mono text-xs tracking-widest uppercase md:hidden', a.text)}>{entry.period}</p>
      <h3 className="mt-2 font-display text-3xl tracking-tight md:mt-0">{entry.org}</h3>
      {entry.orgNote && <p className="mt-0.5 text-xs text-muted">{entry.orgNote}</p>}
      <p className="mt-3 font-medium">{entry.role}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <MapPin size={13} aria-hidden="true" /> {entry.location}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{entry.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {entry.tags.map((t) => (
          <li key={t}>
            <Chip>{t}</Chip>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn('mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium', a.text)}
      >
        {open ? 'Hide highlights' : `Show highlights (${pointCount})`}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-line pt-5">
              {entry.tracks.map((t) => (
                <div key={t.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="font-mono text-xs text-muted">{t.period}</p>
                  </div>
                  <ul className="mt-2.5 space-y-2">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden="true" className={cn('mt-2 size-1.5 shrink-0 rounded-full', a.dot)} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  // Progress runs from when the list top hits 70% of the viewport to when its bottom does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <ol ref={ref} className="relative mt-16 space-y-10 md:space-y-16">
      {/* Rail + scroll progress */}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gradient-to-b from-scm via-esg to-ai md:left-1/2 md:-translate-x-1/2"
      />

      {timeline.map((entry, i) => {
        const left = i % 2 === 0
        const a = accent[entry.pillar]
        const Icon = entry.kind === 'education' ? GraduationCap : Briefcase
        return (
          <li key={entry.id} className="relative grid grid-cols-[2.5rem_1fr] gap-5 md:grid-cols-[1fr_3rem_1fr] md:gap-8">
            {/* Period label on the opposite side (desktop only) */}
            <Reveal
              className={cn(
                'hidden md:flex md:pt-7',
                left ? 'md:order-3 md:justify-start' : 'md:order-1 md:justify-end',
              )}
            >
              <div className={cn(left ? 'text-left' : 'text-right')}>
                <p className={cn('font-mono text-xs tracking-widest uppercase', a.text)}>
                  {entry.kind === 'education' ? 'Education' : 'Experience'}
                </p>
                <p className="mt-1 font-display text-4xl tracking-tight text-ink/80">{entry.period}</p>
              </div>
            </Reveal>

            {/* Node on the rail */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-10 md:order-2 md:flex md:justify-center md:pt-6"
            >
              <span className={cn('grid size-10 place-items-center rounded-full border-2 bg-surface md:size-12', a.border, a.text)}>
                <Icon size={18} aria-hidden="true" />
              </span>
            </motion.div>

            {/* Card */}
            <Reveal className={cn(left ? 'md:order-1' : 'md:order-3')}>
              <TimelineCard entry={entry} defaultOpen={i === timeline.length - 1} />
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}

export default function Journey() {
  return (
    <Page title="Journey">
      <section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Experience timeline"
            title={
              <>
                From the <em className="text-scm">loom</em> to the <em className="text-ai">language model</em>.
              </>
            }
            description="Textile engineering taught me how physical supply chains work. Running them at Arvind taught me their economics. IIM Mumbai added the sustainability lens — and at Wipro I build the AI layer on top."
          />
          <Timeline />
        </Container>
      </section>

      {/* Recognition */}
      <section className="mt-28">
        <Container>
          <SectionHeading eyebrow="Recognition" title="Along the way." />
          <motion.ul
            className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {awards.map((aw) => (
              <motion.li key={aw.title + aw.org} variants={fadeUp} className="flex flex-col gap-3 bg-surface p-6">
                <div className="flex items-center justify-between">
                  <Award size={18} className="text-scm" aria-hidden="true" />
                  {aw.year && <span className="font-mono text-xs text-muted">{aw.year}</span>}
                </div>
                <p className="font-medium">{aw.title}</p>
                <p className="text-sm text-muted">{aw.org}</p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <p>
              <span className="font-mono text-xs tracking-widest text-ink uppercase">Languages · </span>
              {profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
            </p>
            <p>
              <span className="font-mono text-xs tracking-widest text-ink uppercase">Off the clock · </span>
              {profile.interests.join(', ')}
            </p>
          </Reveal>
        </Container>
      </section>
    </Page>
  )
}
