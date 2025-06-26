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
  manifest: false,
};

export { configPWA };
