import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vitesconfigPaths from "vite-tsconfig-paths";
import { configPWA } from "./pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },

  plugins: [
    react(),
    VitePWA(configPWA),
    vitesconfigPaths(),
    sentryVitePlugin({
      org: "inube",
      project: "app-personas",
      sourcemaps: {
        filesToDeleteAfterUpload: ["**/*.js.map"],
      },
      /* eslint-disable no-undef */
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    }),
  ],

  server: {
    open: true, 
    port: 3000,
  },

  /* eslint-disable no-undef */
  resolve: {
    alias: {
      "@design": path.resolve(__dirname, "./src/design"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@ptypes": path.resolve(__dirname, "./src/types"),
      "@forms": path.resolve(__dirname, "./src/shared/forms"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
