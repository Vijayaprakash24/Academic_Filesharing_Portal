import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default is fine, but keep it explicit
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // optional aliasing
    }
  },
  server: {
    // This ensures dev server won't 404 on refresh in dev mode
    historyApiFallback: true
  }
})
