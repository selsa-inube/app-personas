import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsMyRequests: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myRequests",
    path: "/my-requests",
    label: "Mis solicitudes",
    isActive: true,
  },
];

export { crumbsMyRequests };
