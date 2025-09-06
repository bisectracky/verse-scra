import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // Enable fast refresh
    fastRefresh: true,
  })],
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      port: 5173,
      host: 'localhost'
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  css: {
    devSourcemap: true,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})