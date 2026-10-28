import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // readable class names in dev tools, e.g. XPProgress_bar__1a2b3
      generateScopedName: '[name]_[local]__[hash:base64:5]',
    },
  },
});
