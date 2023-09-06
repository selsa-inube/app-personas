import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsSaving = (product_id?: string): IBreadcrumbItem[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "mySavings",
    path: "/my-savings",
    label: "Mis ahorros",
  },
  {
    id: "savingAccount",
    path: `/my-savings/account/${product_id}`,
    label: "Consulta de ahorros",
    isActive: true,
  },
];

export { crumbsSaving };
