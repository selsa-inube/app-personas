import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsEvents: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "event",
    path: "/events",
    label: "Eventos",
    isActive: true,
  },
];

export { crumbsEvents };
