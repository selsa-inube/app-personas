import { VitePWAOptions } from "vite-plugin-pwa";

const configPWA: VitePWAOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  minify: false,
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
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
    start_url: ".",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#317EFB",
    icons: [
      {
        src: "https://storage.googleapis.com/assets-clients/inube/prosel/icons/prosel-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://storage.googleapis.com/assets-clients/inube/prosel/icons/prosel-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export { configPWA };
