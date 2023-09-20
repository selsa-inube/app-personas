import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsSavingsCommitments = (
  commitment_id?: string
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
    id: "savingsCommitment",
    path: `/my-savings/commitment/${commitment_id}`,
    label: "Consulta de compromisos",
    isActive: true,
  },
];

export { crumbsSavingsCommitments };