import { enviroment } from "@config/enviroment";
import { theme } from "@config/theme";

async function updateManifest(): Promise<void> {
  try {
    const response = await fetch("/manifest.json");
    const manifest = await response.json();

    const clientName = enviroment.CLIENT_NAME;

    manifest.name = clientName;
    manifest.short_name = clientName;
    manifest.icons = [
      {
        src: theme.images.icons["16"],
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: theme.images.icons["64"],
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: theme.images.icons["192"],
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: theme.images.icons["512"],
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ];

    const stringManifest = JSON.stringify(manifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);

    let manifestElement = document.querySelector(
      'link[rel="manifest"]',
    ) as HTMLLinkElement;

    if (!manifestElement) {
      manifestElement = document.createElement("link");
      manifestElement.rel = "manifest";
      document.head.appendChild(manifestElement);
    }

    manifestElement.href = manifestURL;
  } catch (error) {
    console.error("Error loading manifest:", error);
  }
}

export { updateManifest };
