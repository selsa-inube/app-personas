import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMyInvestments: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    isActive: false,
  },
  {
    id: "myInvestments ",
    path: "/my-investments",
    label: "Mis inversiones",
    isActive: true,
  },
];

export { crumbsMyInvestments };