import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitesconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitesconfigPaths()],
  server: {
    open: true,
  },
});
