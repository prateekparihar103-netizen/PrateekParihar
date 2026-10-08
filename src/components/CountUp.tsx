/**
 * Animated number that counts from 0 to `value` the first time it
 * scrolls into view. Reduced-motion users get the final value instantly.
 * The real value is always in the accessible label, so screen readers
 * never hear intermediate numbers.
 */
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    // Reduced-motion users start at the final value (see useState above).
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`} className="tabular-nums">
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  )
}
