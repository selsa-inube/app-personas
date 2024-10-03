import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsCreatePQRS: IBreadcrumbsRoute[] = [
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
    id: "createPQRS",
    path: "/my-pqrs/create",
    label: "Crear PQRS",
    isActive: true,
  },
];

export { crumbsCreatePQRS };
