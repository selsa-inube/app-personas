import { buttonAppearance } from "@design/input/Button/types";

const deleteReferenceModal = {
    title: "Eliminar referencia",
    description: ( reference : string) =>
      `¿Deseas eliminar ${reference} como referencia?`,
    actionText: "Eliminar",
    appearance: buttonAppearance[3],
    portalId: "modals",
};

export { deleteReferenceModal };
