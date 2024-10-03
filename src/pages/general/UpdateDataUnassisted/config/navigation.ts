import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsUpdateData: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "updateData",
    path: "/update-data-unassisted",
    label: "Actualización de datos",
    isActive: true,
  },
];

export { crumbsUpdateData };
