import { ReferenceModal } from "@components/modals/general/updateData/ReferenceModal";
import { Icon } from "@design/data/Icon";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface EditReferenceUIProps {
  showModal: boolean;
  formik: FormikValues;
  handleEditModal: () => void;
  handleEditReference: () => void;
  closeModal: () => void;
}

function EditReferenceUI(props: EditReferenceUIProps) {
  const {
    showModal,
    formik,
    handleEditModal,
    handleEditReference,
    closeModal,
  } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={handleEditModal}
      />

      {showModal && (
        <ReferenceModal
          title="Editar referencia"
          description="Editar la referencia personal"
          confirmButtonText="Guardar"
          portalId="modals"
          formik={formik}
          onCloseModal={closeModal}
          onConfirm={handleEditReference}
          withCustomDirty
        />
      )}
    </>
  );
}

export { EditReferenceUI };
