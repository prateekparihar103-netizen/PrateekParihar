import { useContext } from 'react'
import { ThemeContext } from './context'

/** Access the current theme and the toggle. Must be used inside <ThemeProvider>. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
