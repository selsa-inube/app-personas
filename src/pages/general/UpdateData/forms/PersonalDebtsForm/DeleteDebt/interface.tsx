import { DecisionModal } from "@components/modals/general/DecisionModal";
import { IEntry } from "@design/data/Table/types";
import { MdDeleteOutline } from "react-icons/md";
import { deleteDebtModal } from "../config/deleteDebt.config";
import { Icon } from "@inubekit/icon";

interface DeleteDebtUIProps {
  debt: IEntry;
  showModal: boolean;
  handleShowModal: () => void;
  handleDeleteDebt: () => void;
  closeModal: () => void;
}

function DeleteDebtUI(props: DeleteDebtUIProps) {
  const { debt, showModal, handleShowModal, handleDeleteDebt, closeModal } =
    props;

  const { title, description, actionText, appearance, portalId } =
    deleteDebtModal;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdDeleteOutline />}
        cursorHover={true}
        size="16px"
        spacing="narrow"
        onClick={handleShowModal}
      />

      {showModal && (
        <DecisionModal
          title={title}
          description={description(`"${debt.debtName}"`)}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={closeModal}
          onClick={handleDeleteDebt}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteDebtUI };
