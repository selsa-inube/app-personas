import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsUpdateData: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "updateData",
    path: "/update-data-assisted",
    label: "Actualización de datos",
    isActive: true,
  },
];

export { crumbsUpdateData };
