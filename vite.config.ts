/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) as PluginOption, // Shows bundle size visualization in browser after build
    sentryVitePlugin({
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,

      // Automatically delete source maps after uploading them to Sentry
      sourcemaps: { filesToDeleteAfterUpload: ["**/*.map"] }, // Delete all .map files after upload
      debug: true, // Optional: Print upload + deletion logs (useful in CI debugging)
    }),
  ],

  build: {
    minify: "esbuild", // default
    cssCodeSplit: true, // default

    // by default false(and it should be false for improve performance and security)
    // but for upload Source map on Sentry, Source map generation must be turned on
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      output: {
        // Split vendor code into a separate chunk
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },

  test: {
    globals: true, // Enable global test variables like 'describe' and 'it'
    environment: "jsdom", // Simulate a browser-like environment
    setupFiles: "./src/__tests__/setup.ts", // Load custom setup before tests run
    css: true,
  },
});
