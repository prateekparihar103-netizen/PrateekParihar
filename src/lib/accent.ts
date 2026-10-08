/**
 * Static accent → class maps. Tailwind only generates classes it can see
 * as complete strings, so accent styling is looked up here rather than
 * built with template literals like `text-${accent}`.
 */
import type { Accent, Pillar } from '../data/resume'

export const accent: Record<
  Accent,
  { text: string; dot: string; soft: string; border: string; hoverBorder: string; fill: string }
> = {
  scm: {
    text: 'text-scm',
    dot: 'bg-scm',
    soft: 'bg-scm/10',
    border: 'border-scm/30',
    hoverBorder: 'hover:border-scm/60 focus-visible:border-scm/60',
    fill: 'fill-scm',
  },
  esg: {
    text: 'text-esg',
    dot: 'bg-esg',
    soft: 'bg-esg/10',
    border: 'border-esg/30',
    hoverBorder: 'hover:border-esg/60 focus-visible:border-esg/60',
    fill: 'fill-esg',
  },
  ai: {
    text: 'text-ai',
    dot: 'bg-ai',
    soft: 'bg-ai/10',
    border: 'border-ai/30',
    hoverBorder: 'hover:border-ai/60 focus-visible:border-ai/60',
    fill: 'fill-ai',
  },
  ink: {
    text: 'text-ink',
    dot: 'bg-ink',
    soft: 'bg-ink/5',
    border: 'border-ink/20',
    hoverBorder: 'hover:border-ink/50 focus-visible:border-ink/50',
    fill: 'fill-ink',
  },
}

export const pillarLabel: Record<Pillar, string> = {
  scm: 'Supply Chain',
  esg: 'ESG',
  ai: 'GenAI',
}

/** Tiny className joiner (avoids pulling in clsx for one function). */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')
