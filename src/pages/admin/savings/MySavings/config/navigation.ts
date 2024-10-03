import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsMySavings: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "mySavings",
    path: "/my-savings",
    label: "Mis ahorros",
    isActive: true,
  },
];

export { crumbsMySavings };
