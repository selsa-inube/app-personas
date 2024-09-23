import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { Icon } from "@inubekit/icon";
import { FormikProps } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { IFamilyGroupEntries } from "../types";

interface EditFamilyMemberUIProps {
  showModal: boolean;
  formik: FormikProps<IFamilyGroupEntries>;
  onEditModal: () => void;
  onCloseModal: () => void;
  onConfirm: () => void;
  isRequired: (fieldName: string) => boolean;
}

function EditFamilyMemberUI(props: EditFamilyMemberUIProps) {
  const {
    showModal,
    formik,
    onEditModal,
    onCloseModal,
    onConfirm,
    isRequired,
  } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        size="16px"
        spacing="narrow"
        cursorHover
        onClick={onEditModal}
      />

      {showModal && (
        <EditFamilyMemberModal
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseModal}
          onConfirm={onConfirm}
          isRequired={isRequired}
        />
      )}
    </>
  );
}

export { EditFamilyMemberUI };
