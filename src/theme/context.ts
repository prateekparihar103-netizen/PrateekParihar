import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

/** Holds the current theme; provided by <ThemeProvider>, read via useTheme(). */
export const ThemeContext = createContext<ThemeContextValue | null>(null)
