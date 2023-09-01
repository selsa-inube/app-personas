import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsInvestment = (product_id?: string): IBreadcrumbItem[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
    isActive: false,
  },
  {
    id: "myInvestments",
    path: "/my-investments",
    label: "Mis inversiones",
    isActive: false,
  },
  {
    id: "investment",
    path: `/my-investments/${product_id}`,
    label: "Consulta de inversiones",
    isActive: true,
  },
];

export { crumbsInvestment };
