import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        native: false, // ✅ exportAsDefault 옵션 대신 사용
      },
    }),
    react(),
    tsconfigPaths(),
  ],
});
