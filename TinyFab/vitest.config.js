import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',  // or 'jsdom'
    coverage: {
      provider: 'v8', // or 'istanbul' if you prefer
      reporter: ['text', 'json', 'html'], // choose the reporters you need
    },
  },
});