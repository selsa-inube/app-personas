import { IBreadcrumbsRoute } from "@inubekit/breadcrumbs";

const crumbsSaving = (productId?: string): IBreadcrumbsRoute[] => {
  return [
    {
      id: "home",
      path: "/",
      label: "Home",
    },
    {
      id: "mySavings",
      path: "/my-savings",
      label: "Mis ahorros",
    },
    {
      id: "savingAccount",
      path: `/my-savings/account/${productId}`,
      label: "Consulta de ahorros",
      isActive: true,
    },
  ];
};

export { crumbsSaving };
