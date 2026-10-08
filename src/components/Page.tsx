/**
 * Route wrapper: applies the shared page enter/exit transition and
 * clears the fixed navbar. Every page renders inside one of these.
 */
import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { pageVariants } from '../motion/presets'

export function Page({ title, children }: { title: string; children: ReactNode }) {
  // Keep the browser tab title in sync with the route.
  useEffect(() => {
    document.title = `${title} — Prateek Parihar`
  }, [title])

  return (
    <motion.main
      id="main"
      tabIndex={-1}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="pt-28 outline-none sm:pt-32"
    >
      {children}
    </motion.main>
  )
}
