import { VitePWAOptions } from "vite-plugin-pwa";

const manifestPWA: VitePWAOptions = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  minify: false,
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    navigateFallback: null,
  },
  injectManifest: {
    injectionPoint: undefined,
  },
  includeAssets: [],
  includeManifestIcons: true,
  disable: false,
  manifest: false,
};

export { manifestPWA };
