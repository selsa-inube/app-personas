import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsRequest = (request_id?: string): IBreadcrumbsRoute[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myRequests",
    path: "/my-requests",
    label: "Mis solicitudes",
  },
  {
    id: "request",
    path: `/my-requests/${request_id}`,
    label: "Detalles de solicitud",
    isActive: true,
  },
];

export { crumbsRequest };
