import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
    holdUntilCrawlEnd: false,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
    open: true,
    watch: {
      ignored: ["**/.watchman-cookie-*"],
    },
  },
  build: {
    outDir: "build",
  },
  clearScreen: false,
});
