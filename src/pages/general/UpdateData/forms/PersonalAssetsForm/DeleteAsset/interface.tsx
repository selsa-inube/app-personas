import { DecisionModal } from "@components/modals/general/DecisionModal";
import { Icon } from "@design/data/Icon";
import { IEntry } from "@design/data/Table/types";
import { MdDeleteOutline } from "react-icons/md";
import { deleteAssetModal } from "../config/deleteAsset.config";

interface DeleteAssetUIProps {
  asset: IEntry;
  showModal: boolean;
  handleShowModal: () => void;
  handleDeleteAsset: () => void;
  closeModal: () => void;
}

function DeleteAssetUI(props: DeleteAssetUIProps) {
  const { asset, showModal, handleShowModal, handleDeleteAsset, closeModal } =
    props;

  const { title, description, actionText, appearance, portalId } =
    deleteAssetModal;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdDeleteOutline />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={handleShowModal}
      />

      {showModal && (
        <DecisionModal
          title={title}
          description={description(`"${asset.assetName}"`)}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={closeModal}
          onClick={handleDeleteAsset}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteAssetUI };
