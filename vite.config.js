import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'https://de55-2607-fea8-3522-bc00-9879-7f13-2539-a9d2.ngrok-free.app',
      'de55-2607-fea8-3522-bc00-9879-7f13-2539-a9d2.ngrok-free.app'
    ],
  },
})
