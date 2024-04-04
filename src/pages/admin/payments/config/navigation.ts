import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsPayments: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "payments",
    path: "/payments",
    label: "Pagos",
    isActive: true,
  },
];

export { crumbsPayments };
