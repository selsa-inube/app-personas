import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsConsumption = (
  card_id?: string,
  credit_quota_id?: string,
  consumption_id?: string,
): IBreadcrumbItem[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "myCards",
    path: "/my-cards",
    label: "Mis tarjetas",
  },
  {
    id: "card",
    path: `/my-cards/${card_id}`,
    label: "Consulta de tarjetas",
  },
  {
    id: "creditQuota",
    path: `/my-cards/${card_id}/credit-quota/${credit_quota_id}`,
    label: "Detalles del cupo",
  },
  {
    id: "consumption",
    path: `/my-cards/${card_id}/credit-quota/${credit_quota_id}/consumption/${consumption_id}`,
    label: "Consulta de consumos",
    isActive: true,
  },
];

export { crumbsConsumption };
