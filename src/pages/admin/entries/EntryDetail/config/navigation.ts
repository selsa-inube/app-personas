import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsEntry = (entry_id?: string): IBreadcrumbsRoute[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myEntries",
    path: "/my-entries",
    label: "Mis entradas",
  },
  {
    id: "entry",
    path: `/my-entries/${entry_id}`,
    label: "Detalles de entrada",
    isActive: true,
  },
];

export { crumbsEntry };
