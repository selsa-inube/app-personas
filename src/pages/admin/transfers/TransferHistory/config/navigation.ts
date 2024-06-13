import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsTransferHistory: IBreadcrumbItem[] = [
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
