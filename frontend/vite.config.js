import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react(), nodePolyfills()],
  // build: {
  //   target: "esnext",
  //   polyfillDynamicImport: false,
  // },
  // optimizeDeps: {
  //   exclude: ["randombytes"],
  // },
});
