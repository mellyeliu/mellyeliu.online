import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: false,
    }),
    react(),
  ],
  // Components use JSX in .js files. `exclude: []` overrides Vite's default,
  // which skips .js files.
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
