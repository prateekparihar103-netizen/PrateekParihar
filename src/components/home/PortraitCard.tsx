/**
 * Portrait with a pointer-driven 3D tilt and floating credential badges.
 * Tilt is disabled for reduced-motion users and on touch (no hover).
 */
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Award, Bot, GraduationCap } from 'lucide-react'
import type { PointerEvent } from 'react'
import { profile } from '../../data/resume'
import { ease } from '../../motion/presets'

const badges = [
  { icon: Bot, text: '20+ AI agents shipped', tone: 'text-ai', pos: 'left-3 top-6 sm:-left-8' },
  { icon: GraduationCap, text: 'IIM Mumbai · Distinction', tone: 'text-esg', pos: 'right-3 top-1/2 sm:-right-10' },
  { icon: Award, text: '6× Oracle certified', tone: 'text-scm', pos: 'left-3 top-[60%] sm:-left-8' },
]

export function PortraitCard() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 18 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.25 }}
      className="relative mx-auto w-full max-w-sm"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-2xl shadow-black/10 dark:shadow-black/50"
      >
        <img
          src={`${import.meta.env.BASE_URL}${profile.photo}`}
          alt="Prateek Parihar in a navy suit, smiling, in front of the IIM Mumbai name wall"
          width={750}
          height={1000}
          fetchPriority="high"
          className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-[50%_35%]"
        />
        <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[1.6rem] bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-80">Currently</p>
          <p className="mt-1 text-sm font-medium">
            {profile.currentRole} · {profile.company}
          </p>
        </div>
      </motion.div>

      {/* Floating credential badges, staggered in after the portrait. */}
      {badges.map((b, i) => (
        <motion.div
          key={b.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.15, duration: 0.5, ease }}
          className={`absolute ${b.pos} flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-2 text-xs font-medium shadow-lg shadow-black/5 backdrop-blur-md`}
        >
          <b.icon size={14} className={b.tone} aria-hidden="true" />
          {b.text}
        </motion.div>
      ))}
    </motion.div>
  )
}
