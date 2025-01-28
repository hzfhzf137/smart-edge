import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/smart-edge/',  // Set the base path to your repository name
  plugins: [react(), tailwindcss()],
})
