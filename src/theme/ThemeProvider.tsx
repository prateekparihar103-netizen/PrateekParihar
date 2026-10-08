/**
 * ThemeProvider — light/dark mode state.
 *
 * - Initial value mirrors the inline script in index.html (saved choice,
 *   else the OS preference), so React and the first paint agree.
 * - Follows OS changes until the visitor makes an explicit choice.
 */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './context'

const STORAGE_KEY = 'theme'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  // Reflect the theme on <html> so Tailwind's `dark:` variant applies.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Track OS-level changes only while the visitor hasn't chosen explicitly.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* storage blocked — fall through and follow the OS */
      }
      setTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* private mode — the choice simply won't persist */
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
