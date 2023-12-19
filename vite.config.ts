import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vitesconfigPaths from "vite-tsconfig-paths";
import { manifestForPlugIn } from "./manifest.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn), vitesconfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@design": path.resolve(__dirname, "./src/design"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@ptypes": path.resolve(__dirname, "./src/types"),
    },
  },
});
