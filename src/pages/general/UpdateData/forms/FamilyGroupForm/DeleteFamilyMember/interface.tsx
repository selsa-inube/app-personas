import { DecisionModal } from "@components/modals/general/DecisionModal";
import { IEntry } from "@design/data/Table/types";
import { MdDeleteOutline } from "react-icons/md";
import { deleteFamilyMemberModal } from "../config/deleteMember";
import { Icon } from "@inubekit/icon";

interface DeleteFamilyMemberUIProps {
  member: IEntry;
  showModal: boolean;
  onShowModal: () => void;
  onDeleteMember: () => void;
  onCloseModal: () => void;
}

function DeleteFamilyMemberUI(props: DeleteFamilyMemberUIProps) {
  const { member, showModal, onShowModal, onDeleteMember, onCloseModal } =
    props;

  const { title, description, actionText, appearance, portalId } =
    deleteFamilyMemberModal;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdDeleteOutline />}
        cursorHover={true}
        size="16px"
        spacing="narrow"
        onClick={onShowModal}
      />

      {showModal && (
        <DecisionModal
          title={title}
          description={description(
            `${member?.firstName} ${member?.firstLastName}`,
          )}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={onCloseModal}
          onClick={onDeleteMember}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteFamilyMemberUI };
