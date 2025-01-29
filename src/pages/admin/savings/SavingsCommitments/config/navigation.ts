import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsSavingsCommitments = (
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
    isActive: true,
  },
];

export { crumbsSavingsCommitments };
