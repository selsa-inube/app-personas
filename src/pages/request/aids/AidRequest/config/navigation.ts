import { IBreadcrumbsRoute, IOption } from "@inubekit/inubekit";

const crumbsAidRequest = (aidType: IOption): IBreadcrumbsRoute[] => [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "aids",
    path: "/aids",
    label: "Solicitud de auxilio",
  },
  {
    id: "aidRequest",
    path: `/aids/${aidType.id}`,
    label: aidType.label,
    isActive: true,
  },
];

export { crumbsAidRequest };
