import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMyAids: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "aid",
    path: "/aids",
    label: "Solicitud de auxilio",
    isActive: true,
  },
];

export { crumbsMyAids };