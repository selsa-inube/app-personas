import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsTransferOptions: IBreadcrumbItem[] = [
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
