import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves this site at /portfolio/, but Vercel (and custom
  // domains) serve it at the root. Vercel sets VERCEL=1, so branch on it.
  base: process.env.VERCEL ? '/' : '/portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
