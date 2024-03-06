import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsMyCards: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myCards",
    path: "/my-cards",
    label: "Mis tarjetas",
    isActive: true,
  },
];

export { crumbsMyCards };
