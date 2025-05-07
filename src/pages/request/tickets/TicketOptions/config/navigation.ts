import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsTickets: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "ticket",
    path: "/tickets",
    label: "Boletería",
    isActive: true,
  },
];

export { crumbsTickets };
