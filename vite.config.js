import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/product-list-with-cart-main/',
  plugins: [
    react()],
})
