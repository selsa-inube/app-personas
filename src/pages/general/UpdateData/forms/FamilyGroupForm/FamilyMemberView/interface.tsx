import { DecisionModal } from "@components/modals/general/DecisionModal";
import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { FamilyMemberViewModal } from "@components/modals/general/updateData/FamilyGroupModals/FamilyMemberViewModal";
import { IEntry } from "@design/data/Table/types";
import { Icon } from "@inubekit/icon";
import { FormikValues } from "formik";
import { MdOpenInNew } from "react-icons/md";
import { deleteFamilyMemberModal } from "../config/deleteMember";
import * as Yup from "yup";
interface FamilyMemberViewUIProps {
  showModal: boolean;
  formik: FormikValues;
  member: IEntry;
  showDeleteModal: boolean;
  showEditModal: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onCloseModal: () => void;
  onShowModal: () => void;
  onDeleteModal: () => void;
  onEditModal: () => void;
  onDeleteMember: () => void;
  onConfirm: () => void;
  onCloseDeleteModal: () => void;
  onCloseEditModal: () => void;
}

function FamilyMemberViewUI(props: FamilyMemberViewUIProps) {
  const {
    showModal,
    formik,
    member,
    showDeleteModal,
    showEditModal,
    validationSchema,
    onCloseModal,
    onShowModal,
    onDeleteModal,
    onEditModal,
    onDeleteMember,
    onConfirm,
    onCloseDeleteModal,
    onCloseEditModal,
  } = props;

  const { title, description, actionText, appearance, portalId } =
    deleteFamilyMemberModal;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOpenInNew />}
        size="16px"
        spacing="narrow"
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
          validationSchema={validationSchema}
          onCloseModal={onCloseEditModal}
          onConfirm={onConfirm}
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
