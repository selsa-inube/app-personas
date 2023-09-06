import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMyCredits: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myCredits",
    path: "/my-credits",
    label: "Mis créditos",
    isActive: true,
  },
];

export { crumbsMyCredits };
