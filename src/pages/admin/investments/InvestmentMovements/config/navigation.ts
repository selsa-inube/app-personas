import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsInvestmentMovements = (
  productId?: string
): IBreadcrumbItem[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myInvestments",
    path: "/my-investments",
    label: "Mis inversiones",
  },
  {
    id: "investment",
    path: `/my-investments/${productId}`,
    label: "Consulta de inversiones",
  },
  {
    id: "investmentMovements",
    path: `/my-investments/${productId}/movements`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsInvestmentMovements };
