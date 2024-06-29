import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/noteapp-with-react/'
  base: process.env.GITHUB_PAGES  // この行を追加
        ? "noteapp-with-react"            // この行を追加
        : "./",                     // この行を追加
})
