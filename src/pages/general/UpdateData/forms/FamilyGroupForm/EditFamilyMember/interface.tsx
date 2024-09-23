import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { Icon } from "@inubekit/icon";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import * as Yup from "yup";

interface EditFamilyMemberUIProps {
  showModal: boolean;
  formik: FormikValues;
  onEditModal: () => void;
  onCloseModal: () => void;
  onConfirm: () => void;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function EditFamilyMemberUI(props: EditFamilyMemberUIProps) {
  const {
    showModal,
    formik,
    validationSchema,
    onEditModal,
    onCloseModal,
    onConfirm,
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
          validationSchema={validationSchema}
        />
      )}
    </>
  );
}

export { EditFamilyMemberUI };
