import { buttonAppearance } from "@design/input/Button/types";

const deleteAssetModal = {
    title: "Eliminar activo",
    description: ( asset : string ) =>
      `¿Deseas eliminar ${asset} como activo?`,
    actionText: "Eliminar",
    appearance: buttonAppearance[3],
    portalId: "modals",
};

export { deleteAssetModal };
