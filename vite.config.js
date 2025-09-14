import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx,js,ts}",
      babel: {
        plugins: [
          [
            "@stylexjs/babel-plugin",
            {
              dev: process.env.NODE_ENV === "development",
              test: process.env.NODE_ENV === "test",
              runtimeInjection: false,
              treeshakeCompensation: true,
              unstable_moduleResolution: {
                type: "commonJS",
              },
            },
          ],
        ],
      },
    }),
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
