import { IButtonAppearance } from "@inubekit/button";
import { IFlagAppearance } from "@inubekit/flag";

const deleteReferenceModal = {
  title: "Eliminar referencia",
  description: (reference: string) =>
    `¿Deseas eliminar ${reference} como referencia?`,
  actionText: "Eliminar",
  appearance: "danger" as IButtonAppearance,
  portalId: "modals",
};

const deleteReferenceMessages = {
  success: {
    id: 1,
    title: "Referencia eliminada!",
    description: (code?: string) =>
      `Hemos eliminado la referencia "${code}" correctamente.`,
    appearance: "success" as IFlagAppearance,
  },
  failed: {
    id: 2,
    title: "¡Uy, algo salió mal!",
    description: (code?: string) =>
      `Hemos presentado problemas eliminando la referencia "${code}".`,
    appearance: "success" as IFlagAppearance,
  },
};

export { deleteReferenceModal, deleteReferenceMessages };
