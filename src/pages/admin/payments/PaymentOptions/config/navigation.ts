import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsPaymentOptions: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "payments",
    path: "/payments",
    label: "Pagos",
    isActive: true,
  },
];

export { crumbsPaymentOptions };
