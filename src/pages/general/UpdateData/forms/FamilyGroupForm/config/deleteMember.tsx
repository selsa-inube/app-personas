import { IDecisionModalOptions } from "@components/modals/general/DecisionModal/types";
import { IMessageCases } from "@ptypes/messages.types";

const deleteFamilyMemberModal: IDecisionModalOptions = {
  title: "Eliminar familiar",
  description: (member: string) =>
    `¿Deseas eliminar a ${member} como familiar?`,
  actionText: "Eliminar",
  appearance: "danger",
  portalId: "modals",
};

const deleteFamilyMemberMsgs: IMessageCases = {
  success: {
    id: 1,
    title: "¡Familiar eliminado!",
    description: (member?: string) =>
      `Hemos eliminado el familiar "${member}" correctamente`,
    appearance: "success",
  },
  failed: {
    id: 2,
    title: "¡Uy, algo salió mal!",
    description: (member?: string) =>
      `Hemos presentado problemas eliminando el familiar "${member}".`,
    appearance: "danger",
  },
};

export { deleteFamilyMemberModal, deleteFamilyMemberMsgs };
