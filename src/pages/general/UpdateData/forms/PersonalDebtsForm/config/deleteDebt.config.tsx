import { IButtonAppearance } from "@inubekit/button";
import { IFlagAppearance } from "@inubekit/flag";

const deleteDebtModal = {
  title: "Eliminar deuda",
  description: (debt: string) => `¿Deseas eliminar ${debt} como pasivo?`,
  actionText: "Eliminar",
  appearance: "danger" as IButtonAppearance,
  portalId: "modals",
};

const deleteDebtMessages = {
  success: {
    id: 1,
    title: "Pasivo eliminado!",
    description: (code?: string) =>
      `Hemos eliminado el pasivo "${code}" correctamente`,
    appearance: "success" as IFlagAppearance,
  },
  failed: {
    id: 2,
    title: "¡Uy, algo salió mal!",
    description: (code?: string) =>
      `Hemos presentado problemas eliminando el pasivo "${code}".`,
    appearance: "success" as IFlagAppearance,
  },
};

export { deleteDebtModal, deleteDebtMessages };
