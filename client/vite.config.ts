import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config();
let port: number = Number(process.env.SERVER_PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': `http://localhost:${port}`,
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'components': resolve(__dirname, './src/components')
    }
  }
})
