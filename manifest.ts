import { VitePWAOptions } from "vite-plugin-pwa";

const manifestPWA: VitePWAOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  minify: false,
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
  },
  injectManifest: {
    injectionPoint: undefined,
  },
  includeAssets: [],
  includeManifestIcons: true,
  disable: false,
  manifest: {
    name: "Personas",
    short_name: "Personas",
    description: "Portal de clientes",
    lang: "en-ES",
    theme_color: "#fff",
    background_color: "#fff",
    display: "standalone",
    display_override: ["window-controls-overlay"],
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "fondecom-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "fondecom-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "fondecom-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

export { manifestPWA };
