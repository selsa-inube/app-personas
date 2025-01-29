import { ReferenceModal } from "@components/modals/general/updateData/ReferenceModal";
import { Icon } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { IPersonalReferenceEntries } from "../types";

interface EditReferenceUIProps {
  showModal: boolean;
  formik: FormikProps<IPersonalReferenceEntries>;
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
        spacing="narrow"
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
