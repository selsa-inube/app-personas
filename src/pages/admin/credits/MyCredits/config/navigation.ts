import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsMyCredits: IBreadcrumbsRoute[] = [
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
