/**
 * Expanded project dialog with three tabs: Architecture, Stack, Impact.
 *
 * Accessibility: role="dialog" + aria-modal, focus moves to the close
 * button on open and returns to the trigger on close (handled by the
 * parent), Escape and backdrop click close it, Tab is trapped inside,
 * and page scroll is locked while it's open.
 *
 * Rendered through a portal into <body>: the page-transition transform on
 * <main> would otherwise make `position: fixed` relative to <main>, not the viewport.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../data/resume'
import { accent, cn, pillarLabel } from '../../lib/accent'
import { Chip, Dot } from '../Primitives'
import { ArchitectureFlow } from './ArchitectureFlow'

const tabs = [
  { id: 'arch', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
  { id: 'impact', label: 'Impact' },
] as const
type TabId = (typeof tabs)[number]['id']

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<TabId>('arch')
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const main = project.pillars[0]
  const a = accent[main]

  // Lock scroll, focus the close button, close on Escape.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Minimal focus trap: wrap Tab / Shift+Tab within the dialog.
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const i = tabs.findIndex((t) => t.id === tab)
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    setTab(next.id)
    document.getElementById(`tab-${project.slug}-${next.id}`)?.focus()
  }

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="pointer-events-none relative flex min-h-full items-start justify-center p-3 sm:items-center sm:p-6">
        <motion.div
          ref={dialogRef}
          layoutId={`card-${project.slug}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`dialog-title-${project.slug}`}
          onKeyDown={trapFocus}
          style={{ borderRadius: 28 }}
          className="pointer-events-auto relative my-6 w-full max-w-3xl overflow-hidden border border-line bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className={cn('relative border-b border-line p-6 sm:p-8', a.soft)}>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <p className="flex items-center gap-2 pr-12 font-mono text-xs text-muted">
              {project.pillars.map((p) => (
                <Dot key={p} tone={p} />
              ))}
              {project.pillars.map((p) => pillarLabel[p]).join(' · ')}
            </p>
            <motion.h2
              layoutId={`title-${project.slug}`}
              id={`dialog-title-${project.slug}`}
              className="mt-4 pr-10 font-display text-3xl tracking-tight sm:text-4xl"
            >
              {project.title}
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <p className="mt-1 text-sm text-muted">{project.context}</p>
              <p className="mt-5 text-base leading-relaxed">{project.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">The problem — </span>
                {project.problem}
              </p>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="p-6 sm:p-8">
            <div role="tablist" aria-label="Project details" className="inline-flex rounded-full border border-line bg-surface-2 p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  id={`tab-${project.slug}-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${project.slug}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={onTabKey}
                  className={cn(
                    'relative min-h-10 cursor-pointer rounded-full px-4 text-sm transition-colors duration-200',
                    tab === t.id ? 'text-bg' : 'text-muted hover:text-ink',
                  )}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId={`tab-pill-${project.slug}`}
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <div
              id={`panel-${project.slug}`}
              role="tabpanel"
              aria-labelledby={`tab-${project.slug}-${tab}`}
              className="mt-7 min-h-[16rem]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === 'arch' && <ArchitectureFlow steps={project.architecture} pillar={main} />}

                  {tab === 'stack' && (
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((s, i) => (
                        <motion.li
                          key={s}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Chip tone={main} className="px-3.5 py-2 text-sm">
                            {s}
                          </Chip>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {tab === 'impact' && (
                    <div>
                      <dl className="grid gap-3 sm:grid-cols-3">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="flex flex-col-reverse rounded-2xl border border-line bg-surface-2 p-4">
                            <dt className="mt-1 text-xs text-muted">{m.label}</dt>
                            <dd className={cn('font-display text-3xl', a.text)}>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <ul className="mt-6 space-y-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span aria-hidden="true" className={cn('mt-2 size-1.5 shrink-0 rounded-full', a.dot)} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  ,
    document.body,
  )
}
