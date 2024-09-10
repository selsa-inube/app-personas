import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsTransferHistory: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "transfers",
    path: "/transfers",
    label: "Transferencias",
  },
  {
    id: "transferHistory",
    path: `/transfers/history`,
    label: "Histórico de transferencias",
    isActive: true,
  },
];

export { crumbsTransferHistory };
