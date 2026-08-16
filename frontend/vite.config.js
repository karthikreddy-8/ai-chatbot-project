import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',   // ← CHANGED: was 5000
        changeOrigin: true,
        secure: false,
      },
      '/chat': {
        target: 'http://localhost:8000',   // ← CHANGED: was 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },
})