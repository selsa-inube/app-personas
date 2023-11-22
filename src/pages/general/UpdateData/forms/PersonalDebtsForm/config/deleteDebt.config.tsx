import { buttonAppearance } from "@design/input/Button/types";
import { MdSentimentNeutral, MdThumbUpOffAlt } from "react-icons/md";
import { MessageAppearanceType } from "@design/feedback/SectionMessage/types";

const deleteDebtModal = {
  title: "Eliminar deuda",
  description: (debt: string) => `¿Deseas eliminar ${debt} como pasivo?`,
  actionText: "Eliminar",
  appearance: buttonAppearance[3],
  portalId: "modals",
};

const deleteDebtMessages = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "Pasivo eliminado!",
    description: (code?: string) =>
      `Hemos eliminado el pasivo "${code}" correctamente`,
    appearance: "success" as MessageAppearanceType,
  },
  failed: {
    id: 2,
    icon: <MdSentimentNeutral size={18} />,
    title: "¡Uy, algo salió mal!",
    description: (code?: string) =>
      `Hemos presentado problemas eliminando el pasivo "${code}".`,
    appearance: "success" as MessageAppearanceType,
  },
};

export { deleteDebtModal, deleteDebtMessages };
