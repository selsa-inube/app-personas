import { enviroment } from "@config/enviroment";

async function updateManifest(): Promise<void> {
  const response = await fetch("/manifest.json");
  const manifest = await response.json();

  const clientName = enviroment.CLIENT_NAME;

  manifest.name = clientName;
  manifest.short_name = clientName;
  manifest.icons = [
    {
      src: `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/icons/${enviroment.BUSINESS_UNIT}-16x16.png`,
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/icons/${enviroment.BUSINESS_UNIT}-64x64.png`,
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/icons/${enviroment.BUSINESS_UNIT}-192x192.png`,
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/icons/${enviroment.BUSINESS_UNIT}-512x512.png`,
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
}

export { updateManifest };
