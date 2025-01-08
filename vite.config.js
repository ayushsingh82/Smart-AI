import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    worker: {
      format: 'es'
    },
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY_AUDIT': JSON.stringify(env.VITE_GEMINI_API_KEY_AUDIT),
      'import.meta.env.VITE_GEMINI_API_KEY_CONTRACT': JSON.stringify(env.VITE_GEMINI_API_KEY_CONTRACT)
    }
  }
}) 