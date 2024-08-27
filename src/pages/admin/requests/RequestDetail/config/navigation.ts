import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsRequest = (request_id?: string): IBreadcrumbItem[] => [
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
