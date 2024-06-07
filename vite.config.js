import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import purgecss from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: ['./**/*.html', './src/**/*.jsx', './src/**/*.js', './src/**/*.tsx', './src/**/*.ts'],
      safelist: [/^fa-/, /^btn-/], 
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
});
