import { buttonAppearance } from "@design/input/Button/types";

const deleteDebtModal = {
    title: "Eliminar deuda",
    description: ( debt : string) =>
      `¿Deseas eliminar ${debt} como pasivo?`,
    actionText: "Eliminar",
    appearance: buttonAppearance[3],
    portalId: "modals",
};

export { deleteDebtModal };