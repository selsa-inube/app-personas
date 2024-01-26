import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsUpdateData: IBreadcrumbItem[] = [
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
