/**
 * Cycles through a list of words with a vertical slide — used for the
 * multilingual hero greeting. Width animates via `layout`, so the
 * surrounding text reflows smoothly instead of jumping.
 */
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from '../motion/presets'

export function RotatingWord({
  words,
  interval = 2400,
  className,
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval, reduce])

  return (
    <motion.span layout className={`relative inline-flex overflow-hidden align-bottom ${className ?? ''}`}>
      {/* Screen readers get the first word only, not a live-changing value. */}
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-block whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}
