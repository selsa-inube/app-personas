import { IDecisionModalOptions } from "@components/modals/DecisionModal/types";
import { IMessageCases } from "@ptypes/messages.types";
import { MdSentimentNeutral, MdThumbUpOffAlt } from "react-icons/md";

const deleteFamilyMemberModal: IDecisionModalOptions = {
  title: "Eliminar familiar",
  description: (member: string) =>
    `¿Deseas eliminar a ${member} como familiar?`,
  actionText: "Eliminar",
  appearance: "error",
  portalId: "modals",
};

const deleteFamilyMemberMsgs: IMessageCases = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "¡Familiar eliminado!",
    description: (member?: string) =>
      `Hemos eliminado el familiar "${member}" correctamente`,
    appearance: "success",
  },
  failed: {
    id: 2,
    icon: <MdSentimentNeutral size={18} />,
    title: "¡Uy, algo salió mal!",
    description: (member?: string) =>
      `Hemos presentado problemas eliminando el familiar "${member}".`,
    appearance: "error",
  },
};

export { deleteFamilyMemberModal, deleteFamilyMemberMsgs };
