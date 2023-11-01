import { DecisionModal } from "@components/modals/DecisionModal";
import { Icon } from "@design/data/Icon";
import { MdDeleteOutline } from "react-icons/md";
import { deleteDebtModal } from "../config/deleteDebt.config";
import { IEntry } from "@design/data/Table/types";

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
        spacing="none"
        onClick={handleShowModal}
      />

      {showModal && (
        <DecisionModal
          title={title}
          description={description(`"${debt.debtName}"`)}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={closeModal}
          handleClick={handleDeleteDebt}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteDebtUI };
