import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  environment: 'happy-dom',
  test:{
    globals:true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  }
 })

 