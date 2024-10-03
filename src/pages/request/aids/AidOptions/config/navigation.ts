import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsAids: IBreadcrumbsRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "aid",
    path: "/aids",
    label: "Solicitud de auxilio",
    isActive: true,
  },
];

export { crumbsAids };