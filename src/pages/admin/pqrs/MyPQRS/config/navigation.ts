import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsMyPQRS: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myPQRS",
    path: "/my-pqrs",
    label: "Mis PQRS",
    isActive: true,
  },
];

export { crumbsMyPQRS };
