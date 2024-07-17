import { AssetModal } from "@components/modals/general/updateData/AssetModal";
import { Icon } from "@inubekit/icon";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface EditAssetUIProps {
  showModal: boolean;
  formik: FormikValues;
  handleEditModal: () => void;
  handleEditAsset: () => void;
  closeModal: () => void;
}

function EditAssetUI(props: EditAssetUIProps) {
  const { showModal, formik, handleEditModal, handleEditAsset, closeModal } =
    props;

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
        <AssetModal
          title="Editar bien"
          description="Edita la información de tus bienes."
          confirmButtonText="Guardar"
          portalId="modals"
          formik={formik}
          onCloseModal={closeModal}
          onConfirm={handleEditAsset}
          withCustomDirty
        />
      )}
    </>
  );
}

export { EditAssetUI };
