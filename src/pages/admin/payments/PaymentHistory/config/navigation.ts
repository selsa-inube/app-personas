import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsPaymentHistory: IBreadcrumbItem[] = [
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
    path: `/payments/history`,
    label: "Histórico de pagos",
    isActive: true,
  },
];

export { crumbsPaymentHistory };