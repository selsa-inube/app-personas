import { DecisionModal } from "@components/modals/general/DecisionModal";
import { IEntry } from "@design/data/Table/types";
import { MdDeleteOutline } from "react-icons/md";
import { deleteReferenceModal } from "../config/deleteReference.config";
import { Icon } from "@inubekit/icon";

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
        spacing="narrow"
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
