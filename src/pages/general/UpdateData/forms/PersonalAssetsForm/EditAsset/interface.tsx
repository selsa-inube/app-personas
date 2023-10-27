import { Icon } from "@design/data/Icon";
import { MdOutlineModeEdit } from "react-icons/md";
import { AssetModal } from "@components/modals/forms/update-data/AssetModal";
import { FormikValues } from "formik";

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
        spacing="none"
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
        />
      )}
    </>
  );
}

export { EditAssetUI };
