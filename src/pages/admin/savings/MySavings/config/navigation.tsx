import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMySavings: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    isActive: false,
  },
  {
    id: "mySavings",
    path: "/my-savings",
    label: "Mis ahorros",
    isActive: true,
  },
];

export { crumbsMySavings };
