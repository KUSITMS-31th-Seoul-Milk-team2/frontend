import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        native: false,
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws', 
      host: '34.47.109.128', 
      port: 5173,
    }
  }
});