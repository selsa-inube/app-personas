import { IButtonAppearance } from "@inubekit/button";
import { IFlagAppearance } from "@inubekit/flag";

const deleteAssetModal = {
  title: "Eliminar activo",
  description: (asset: string) => `¿Deseas eliminar ${asset} como activo?`,
  actionText: "Eliminar",
  appearance: "danger" as IButtonAppearance,
  portalId: "modals",
};

const deleteAssetMessages = {
  success: {
    id: 1,
    title: "Activo eliminado!",
    description: (code?: string) =>
      `Hemos eliminado el activo "${code}" correctamente`,
    appearance: "success" as IFlagAppearance ,
  },
  failed: {
    id: 2,
    title: "¡Uy, algo salió mal!",
    description: (code?: string) =>
      `Hemos presentado problemas eliminando el activo "${code}".`,
    appearance: "success" as IFlagAppearance ,
  },
};

export { deleteAssetModal, deleteAssetMessages };
