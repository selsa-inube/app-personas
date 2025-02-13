import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsMyPQRSDetails = (pqrs_id?: string): IBreadcrumbsRoute[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myPQRS",
    path: "/my-pqrs",
    label: "Mis PQRS",
  },
  {
    id: "myPQRSDetails",
    path: `/my-pqrs/details/${pqrs_id}`,
    label: "Detalles de PQRS",
    isActive: true,
  },
];

export { crumbsMyPQRSDetails };
