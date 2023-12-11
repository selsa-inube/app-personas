import { EditFamilyMemberModal } from "@components/modals/forms/update-data/FamilyGroupModals/EditFamilyMemberModal";
import { Icon } from "@design/data/Icon";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface EditFamilyMemberUIProps {
  showModal: boolean;
  formik: FormikValues;
  onEditModal: () => void;
  closeModal: () => void;
  onConfirm: () => void;
}

function EditFamilyMemberUI(props: EditFamilyMemberUIProps) {
  const { showModal, formik, onEditModal, closeModal, onConfirm } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={onEditModal}
      />

      {showModal && (
        <EditFamilyMemberModal
          portalId="modals"
          formik={formik}
          onCloseModal={closeModal}
          onConfirm={onConfirm}
          withCustomDirty
        />
      )}
    </>
  );
}

export { EditFamilyMemberUI };
