import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsSaving = (
  isInvestment: boolean,
  productId?: string
): IBreadcrumbItem[] => {
  const savingsLabel = isInvestment ? "Inversiones" : "Ahorros";

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
      label: `Consulta de ${savingsLabel}`,
      isActive: true,
    },
  ];
};

export { crumbsSaving };
