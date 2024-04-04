import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsPaymentOptions: IBreadcrumbItem[] = [
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
