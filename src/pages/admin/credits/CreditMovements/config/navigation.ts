import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMovements = (credit_id?: string): IBreadcrumbItem[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myCredits",
    path: "/my-credits",
    label: "Mis créditos",
  },
  {
    id: "credit",
    path: `/my-credits/${credit_id}`,
    label: "Consulta de créditos",
  },
  {
    id: "creditMovements",
    path: `/my-credits/${credit_id}/credit-movements`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsMovements };
