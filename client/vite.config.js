import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // ← binds to all network interfaces
    port: 5173,      // optional, but helps avoid random ports
  },
  plugins: [react(),
    tailwindcss(),
  ],
})
