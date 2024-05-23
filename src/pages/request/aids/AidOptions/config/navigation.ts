import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsAids: IBreadcrumbItem[] = [
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

export { crumbsAids };