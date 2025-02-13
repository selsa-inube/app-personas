import { enviroment } from "@config/enviroment";
import { theme } from "@config/theme";

function updateManifest() {
  fetch("/manifest.json")
    .then((response) => response.json())
    .then((manifest) => {
      const businessUnit = enviroment.BUSINESS_UNIT;

      manifest.name = businessUnit;
      manifest.short_name = businessUnit;
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
    })
    .catch((error) => console.error("Error loading manifest:", error));
}

export { updateManifest };
