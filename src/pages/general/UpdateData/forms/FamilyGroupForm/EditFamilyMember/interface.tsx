import { EditFamilyMemberModal } from "@components/modals/forms/update-data/FamilyGroupModals/EditFamilyMemberModal";
import { Icon } from "@design/data/Icon";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface EditFamilyMemberUIProps {
  showModal: boolean;
  formik: FormikValues;
  onEditModal: () => void;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function EditFamilyMemberUI(props: EditFamilyMemberUIProps) {
  const { showModal, formik, onEditModal, onCloseModal, onConfirm } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        size="16px"
        spacing="none"
        cursorHover
        onClick={onEditModal}
      />

      {showModal && (
        <EditFamilyMemberModal
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseModal}
          onConfirm={onConfirm}
          withCustomDirty
        />
      )}
    </>
  );
}

export { EditFamilyMemberUI };
