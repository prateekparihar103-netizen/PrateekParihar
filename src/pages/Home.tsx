/**
 * Home — hero with multilingual greeting, the three pillars, a count-up
 * impact band, featured projects and a closing call to action.
 */
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { CountUp } from '../components/CountUp'
import { HeroBackdrop } from '../components/home/HeroBackdrop'
import { Pillars } from '../components/home/Pillars'
import { PortraitCard } from '../components/home/PortraitCard'
import { Page } from '../components/Page'
import { Container, Dot, Reveal, SectionHeading } from '../components/Primitives'
import { RotatingWord } from '../components/RotatingWord'
import { profile, projects, stats } from '../data/resume'
import { accent, cn, pillarLabel } from '../lib/accent'
import { ease, fadeUp, stagger, viewportOnce } from '../motion/presets'

function Hero() {
  return (
    <section className="relative isolate">
      <HeroBackdrop />
      <Container className="grid items-center gap-14 pt-6 pb-20 lg:grid-cols-[1.25fr_0.75fr] lg:pb-28">
        <motion.div variants={stagger(0.1, 0.05)} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-esg opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-esg" />
            </span>
            <MapPin size={12} aria-hidden="true" />
            {profile.currentRole} at {profile.company} · {profile.location}
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-7 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <RotatingWord words={profile.greetings} className="italic" />, I’m{' '}
            <span className="relative whitespace-nowrap">
              Prateek.
              {/* Hand-drawn underline that draws itself in */}
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full text-ai"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 14 C 80 4, 200 2, 298 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl font-display text-2xl leading-snug text-balance text-muted sm:text-3xl">
            {profile.headline}
          </motion.p>

          {/* Pillar strip */}
          <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-2" aria-label="Core pillars">
            {[
              { id: 'scm' as const, text: 'Oracle Fusion SCM' },
              { id: 'esg' as const, text: 'ESG / BRSR' },
              { id: 'ai' as const, text: 'Generative AI' },
            ].map((p) => (
              <li
                key={p.id}
                className={cn('flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium', accent[p.id].border, accent[p.id].soft, accent[p.id].text)}
              >
                <Dot tone={p.id} />
                {p.text}
              </li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-base leading-relaxed text-muted">
            {profile.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Explore projects
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium transition-colors hover:border-ink/40"
            >
              Get in touch
            </Link>
            <div className="ml-1 flex gap-1">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink">
                <LinkedinIcon size={18} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink">
                <GithubIcon size={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink">
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <PortraitCard />
      </Container>

      <motion.a
        href="#pillars"
        aria-label="Scroll to pillars"
        onClick={(e) => {
          // HashRouter would treat "#pillars" as a route — scroll manually instead.
          e.preventDefault()
          document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] tracking-[0.25em] text-muted uppercase lg:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}

function ImpactBand() {
  return (
    <section aria-label="Impact in numbers" className="border-y border-line bg-surface">
      <Container>
        {/* gap-px over a line-coloured background draws hairline dividers at any column count. */}
        <motion.dl
          className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-10 sm:px-6">
              {/* Animate the contents, not the cell, so the hairline grid never shows through. */}
              <motion.div variants={fadeUp} className="flex flex-col-reverse gap-2">
              <dt>
                <span className="block text-sm font-medium">{s.label}</span>
                {s.note && <span className="mt-0.5 block text-xs text-muted">{s.note}</span>}
              </dt>
              <dd className={cn('font-display text-5xl tracking-tight sm:text-6xl', accent[s.accent].text)}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </motion.div>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  )
}

function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured)
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" eyebrow="Selected work" title="Built, shipped, measured." />
          <Reveal>
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium">
              All projects
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <motion.ul
          className="mt-12 grid gap-4 md:grid-cols-2"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {featured.map((p) => (
            <motion.li key={p.slug} variants={fadeUp}>
              <Link
                to={`/projects?p=${p.slug}`}
                className={cn(
                  'group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 sm:p-8',
                  accent[p.pillars[0]].hoverBorder,
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs text-muted">
                    {p.pillars.map((pl) => (
                      <Dot key={pl} tone={pl} />
                    ))}
                    {p.pillars.map((pl) => pillarLabel[pl]).join(' · ')}
                  </span>
                  <ArrowUpRight size={18} className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-3xl tracking-tight">{p.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted">{p.kicker}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
                  <span className={cn('font-display text-3xl', accent[p.pillars[0]].text)}>{p.metrics[0].value}</span>
                  <span className="text-sm text-muted">{p.metrics[0].label}</span>
                </p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

function ClosingCta() {
  return (
    <section>
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-bg sm:px-14 sm:py-20">
          <div aria-hidden="true" className="absolute -right-20 -bottom-24 size-80 rounded-full bg-ai/40 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-10 left-1/3 size-60 rounded-full bg-esg/30 blur-3xl" />
          <p className="relative font-mono text-xs tracking-[0.2em] uppercase opacity-70">What’s next</p>
          <h2 className="relative mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Have a supply chain that should be thinking for itself?
          </h2>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-bg px-6 text-sm font-medium text-ink transition-opacity hover:opacity-90">
              Start a conversation <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/journey" className="inline-flex h-12 items-center rounded-full border border-bg/30 px-6 text-sm font-medium transition-colors hover:border-bg/70">
              See the journey
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <Page title="Supply Chain & Enterprise AI Consultant">
      <Hero />
      <section id="pillars" className="scroll-mt-28 py-24 sm:py-32">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Three disciplines"
            title={
              <>
                Supply chains, <em className="text-esg">sustainability</em> and the <em className="text-ai">AI</em> that connects them.
              </>
            }
          />
          <div className="mt-14">
            <Pillars />
          </div>
        </Container>
      </section>
      <ImpactBand />
      <FeaturedProjects />
      <ClosingCta />
    </Page>
  )
}
