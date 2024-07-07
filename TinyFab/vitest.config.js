import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'istanbul' if you prefer
      reporter: ['text', 'json', 'html'], // choose the reporters you need
    },
  },
});