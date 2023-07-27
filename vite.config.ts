import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitesconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitesconfigPaths()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@design": path.resolve(__dirname, "./src/design"),
    },
  },
});
