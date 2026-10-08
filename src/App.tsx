/**
 * App shell: router, global motion config, nav/footer and animated routes.
 *
 * HashRouter keeps deep links working on static hosts (GitHub Pages has
 * no SPA rewrites). MotionConfig reducedMotion="user" makes every Framer
 * Motion animation honour the OS "reduce motion" setting.
 */
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Page } from './components/Page'
import { Container } from './components/Primitives'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import { ThemeProvider } from './theme/ThemeProvider'

function NotFound() {
  return (
    <Page title="Not found">
      <Container className="py-24">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">404</p>
        <h1 className="mt-3 font-display text-5xl">This page took a different route.</h1>
        <Link to="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-medium text-bg">
          Back home
        </Link>
      </Container>
    </Page>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    // Wait for the old page to leave, then jump to top before the new one enters.
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <HashRouter>
          <a
            href="#main"
            onClick={(e) => {
              // Hash links would be read as routes by HashRouter — move focus manually.
              e.preventDefault()
              document.getElementById('main')?.focus()
            }}
            className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </HashRouter>
      </MotionConfig>
    </ThemeProvider>
  )
}
