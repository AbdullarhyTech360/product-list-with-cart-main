import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/product-list-with-cart-main/',
  build: {
    outDir: 'dist'
  }
})
