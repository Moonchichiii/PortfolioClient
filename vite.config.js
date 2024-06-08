import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import purgecss from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: [
        './index.html',
        './src/**/*.jsx', 
        './src/**/*.js',
        './src/**/*.ts',
        './src/**/*.tsx',  
        './src/**/*.css', 
        './public/**/*.html',  
      ],
      safelist: {
        standard: [/^btn-/, /^nav-/, /^modal-/, /^carousel-/],  
      },
    }),
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
