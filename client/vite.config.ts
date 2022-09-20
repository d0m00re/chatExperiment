import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '..' }],
   },
})
//https://stackoverflow.com/questions/68241263/absolute-path-not-working-in-vite-project-react-ts