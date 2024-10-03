import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsPaymentHistory: IBreadcrumbsRoute[] = [
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
    id: "paymentHistory",
    path: `/payments/history`,
    label: "Histórico de pagos",
    isActive: true,
  },
];

export { crumbsPaymentHistory };
