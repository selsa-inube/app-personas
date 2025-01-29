import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsTransferOptions: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "transfers",
    path: "/transfers",
    label: "Transferencias",
    isActive: true,
  },
];

export { crumbsTransferOptions };
