import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  build: {
    target: 'esnext', // Target modern JavaScript
    modulePreload: true,
    rollupOptions: {
      output: {
        format: 'es', // Output as ES module
      },
    },
  },
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [vercel()],
});
