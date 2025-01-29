import { IBreadcrumbsRoute } from "@inubekit/inubekit";

const crumbsCardMovements = (
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
    path: `/my-cards/${card_id}/movements/${credit_quota_id}`,
    label: "Movimientos",
    isActive: true,
  },
];

export { crumbsCardMovements };
