import { VitePWAOptions } from "vite-plugin-pwa";

const manifestPWA: VitePWAOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  minify: false,
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    globPatterns: [],
    navigateFallback: null,
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
        src: "fondecom-33x33.png",
        sizes: "33x33",
        type: "image/png",
      },
      {
        src: "fondecom-133x133.png",
        sizes: "133x133",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "fondecom-1067x1067.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "fondecom-400x400.png",
        sizes: "400x400",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

export { manifestPWA };
