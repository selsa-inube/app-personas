import { IBreadcrumbsRoute } from "@inubekit/inubekit";
import { IDomainType } from "@ptypes/domain.types";

const crumbsAidRequest = (aidType: IDomainType): IBreadcrumbsRoute[] => [
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
    label: aidType.value,
    isActive: true,
  },
];

export { crumbsAidRequest };
