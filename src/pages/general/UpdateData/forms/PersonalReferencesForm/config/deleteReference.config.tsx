import { MdSentimentNeutral, MdThumbUpOffAlt } from "react-icons/md";
import { MessageAppearanceType } from "@design/feedback/SectionMessage/types";

const deleteReferenceModal = {
  title: "Eliminar referencia",
  description: (reference: string) =>
    `¿Deseas eliminar ${reference} como referencia?`,
  actionText: "Eliminar",
  appearance: "danger" as MessageAppearanceType,
  portalId: "modals",
};

const deleteReferenceMessages = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "Referencia eliminada!",
    description: (code?: string) =>
      `Hemos eliminado la referencia "${code}" correctamente.`,
    appearance: "success" as MessageAppearanceType,
  },
  failed: {
    id: 2,
    icon: <MdSentimentNeutral size={18} />,
    title: "¡Uy, algo salió mal!",
    description: (code?: string) =>
      `Hemos presentado problemas eliminando la referencia "${code}".`,
    appearance: "success" as MessageAppearanceType,
  },
};

export { deleteReferenceModal, deleteReferenceMessages };
