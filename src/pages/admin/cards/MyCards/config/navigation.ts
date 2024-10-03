import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsMyCards: IBreadcrumbsRoute[] = [
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
