import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Vite config.
 * `base: './'` emits relative asset URLs so the same build works on
 * Vercel (served at /) and on GitHub Pages (served at /<repo-name>/).
 * Routing uses HashRouter, so no server-side rewrites are needed either.
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor code so app updates don't bust the library cache.
        manualChunks: (id) => {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-')) return 'motion'
          if (id.includes('node_modules/react')) return 'react'
        },
      },
    },
  },
})
