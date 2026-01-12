import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // StyleX plugin must come before React plugin to preserve Fast Refresh
    stylex.vite({
      useCSSLayers: false,
    }),
    react(),
  ],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
  clearScreen: false,
});
