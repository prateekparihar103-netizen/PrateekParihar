/**
 * Dark/light switch. The icon rotates out and the next one rotates in,
 * so the change of state is obvious without relying on colour alone.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative grid size-11 cursor-pointer place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink transition-colors duration-200 hover:bg-surface-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -18, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 18, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.22 }}
          className="grid place-items-center"
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
