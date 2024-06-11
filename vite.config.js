import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import PurgeCSS from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    react(),
    PurgeCSS({
      content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [/^.*$/]
      }
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
