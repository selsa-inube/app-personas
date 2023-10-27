import { DecisionModal } from "@components/modals/DecisionModal";
import { Icon } from "@design/data/Icon";
import { MdDeleteOutline } from "react-icons/md";
import { deleteAssetModal } from "../config/deleteAsset.config";
import { IEntry } from "@design/data/Table/types";

interface DeleteAssetUIProps {
  asset: IEntry;
  showModal: boolean;
  handleShowModal: () => void;
  handleDeleteAsset: () => void;
  closeModal: () => void;
}

function DeleteAssetUI(props: DeleteAssetUIProps) {
  const { asset, showModal, handleShowModal, handleDeleteAsset, closeModal } = props;

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
          description={description(`"${asset.assetType}"`)}
          appearance={appearance}
          actionText={actionText}
          onCloseModal={closeModal}
          handleClick={handleDeleteAsset}
          portalId={portalId}
        />
      )}
    </>
  );
}

export { DeleteAssetUI };
