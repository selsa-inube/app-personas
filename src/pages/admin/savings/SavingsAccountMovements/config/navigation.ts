import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsSavingsAccountMovements = (
  productId?: string,
): IBreadcrumbsRoute[] => [
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
    path: `/my-savings/account/${productId}`,
    label: "Consulta de ahorros",
  },
  {
    id: "savingsAccountMovements",
    path: `/my-savings/account${productId}/movements`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsSavingsAccountMovements };
