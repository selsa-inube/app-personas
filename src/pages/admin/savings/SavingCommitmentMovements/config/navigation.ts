import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsSavingCommitmentMovements = (
  commitment_id?: string,
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
    id: "savingsCommitment",
    path: `/my-savings/commitment/${commitment_id}`,
    label: "Consulta de compromisos",
  },
  {
    id: "movements",
    path: `/my-savings/commitment/${commitment_id}/movements`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsSavingCommitmentMovements };
