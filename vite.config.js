import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@safe-{}/safe-ethers-adapters', '@safe-window/safe-ethers-adapters', '@safe-window/safe-ethers-lib', '@safe-window/safe-core-sdk', '@safe-{}/safe-core-sdk', '@safe-{}/safe-ethers-lib'],
    },
  },
  define: {
    global: 'window', // set global to `window` to solve error when packages want to access the `global` object 
    "process.env": {},
  },
})
