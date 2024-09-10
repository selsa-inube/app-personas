import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsPay: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "payments",
    path: "/payments",
    label: "Pagos",
  },
  {
    id: "pay",
    path: `/payments/pay`,
    label: "Realizar pagos",
    isActive: true,
  },
];

export { crumbsPay };
