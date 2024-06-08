import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL, 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
