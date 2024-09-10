import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsCreditQuota = (
  card_id?: string,
  credit_quota_id?: string,
): IBreadcrumbsRoute[] => [
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
    isActive: true,
  },
];

export { crumbsCreditQuota };
