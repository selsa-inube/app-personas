import { DecisionModal } from "@components/modals/general/DecisionModal";
import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { FamilyMemberViewModal } from "@components/modals/general/updateData/FamilyGroupModals/FamilyMemberViewModal";
import { Icon } from "@design/data/Icon";
import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { MdOpenInNew } from "react-icons/md";
import { deleteFamilyMemberModal } from "../config/deleteMember";

interface FamilyMemberViewUIProps {
  showModal: boolean;
  formik: FormikValues;
  member: IEntry;
  showDeleteModal: boolean;
  showEditModal: boolean;
  onCloseModal: () => void;
  onShowModal: () => void;
  onDeleteModal: () => void;
  onEditModal: () => void;
  onDeleteMember: () => void;
  onConfirm: () => void;
  onCloseDeleteModal: () => void;
  onCloseEditModal: () => void;
  isRequired: (fieldName: string) => boolean;
}

function FamilyMemberViewUI(props: FamilyMemberViewUIProps) {
  const {
    showModal,
    formik,
    member,
    showDeleteModal,
    showEditModal,
    onCloseModal,
    onShowModal,
    onDeleteModal,
    onEditModal,
    onDeleteMember,
    onConfirm,
    onCloseDeleteModal,
    onCloseEditModal,
    isRequired,
  } = props;

  const { title, description, actionText, appearance, portalId } =
    deleteFamilyMemberModal;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOpenInNew />}
        size="16px"
        spacing="none"
        onClick={onShowModal}
        cursorHover
      />

      {showModal && (
        <FamilyMemberViewModal
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseModal}
          onDelete={onDeleteModal}
          onEdit={onEditModal}
        />
      )}

      {showEditModal && (
        <EditFamilyMemberModal
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseEditModal}
          onConfirm={onConfirm}
          isRequired={isRequired}
        />
      )}

      {showDeleteModal && (
        <DecisionModal
          title={title}
          description={description(
            `${member?.firstName} ${member?.firstLastName}`,
          )}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={onCloseDeleteModal}
          onClick={onDeleteMember}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { FamilyMemberViewUI };
