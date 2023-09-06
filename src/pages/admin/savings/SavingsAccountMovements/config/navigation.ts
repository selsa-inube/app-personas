import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsSavingsAccountMovements = (
  product_id?: string
): IBreadcrumbItem[] => [
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
    id: "savingsAccount",
    path: `/my-savings/account/${product_id}`,
    label: "Consulta de créditos",
  },
  {
    id: "savingsAccountMovements",
    path: `/my-savings/account${product_id}/movements`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsSavingsAccountMovements };
