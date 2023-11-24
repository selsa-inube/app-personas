import { DecisionModal } from "@components/modals/DecisionModal";
import { Icon } from "@design/data/Icon";
import { IEntry } from "@design/data/Table/types";
import { MdDeleteOutline } from "react-icons/md";
import { deleteReferenceModal } from "../config/deleteReference.config";

interface DeleteReferenceUIProps {
  reference: IEntry;
  showModal: boolean;
  handleShowModal: () => void;
  handleDeleteUser: () => void;
  closeModal: () => void;
}

function DeleteReferenceUI(props: DeleteReferenceUIProps) {
  const {
    reference,
    showModal,
    handleShowModal,
    handleDeleteUser,
    closeModal,
  } = props;

  const { title, description, actionText, appearance, portalId } =
    deleteReferenceModal;

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
          description={description(`"${reference.name}"`)}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={closeModal}
          onClick={handleDeleteUser}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteReferenceUI };
