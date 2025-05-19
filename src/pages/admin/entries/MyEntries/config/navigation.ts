import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsMyEntries: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myEntries",
    path: "/my-entries",
    label: "Mis entradas",
    isActive: true,
  },
];

export { crumbsMyEntries };
