import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
  },
  server: {
    port: 5173,
    hmr: {
      port: 5173,
    },
  },
})