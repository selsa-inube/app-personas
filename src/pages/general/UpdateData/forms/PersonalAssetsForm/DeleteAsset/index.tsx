import { useState } from "react";
import { DeleteAssetUI } from "./interface";
import { IEntry } from "@design/data/Table/types";

interface DeleteAssetProps {
  asset: IEntry;
  handleDeleteAsset: () => void;
}

function DeleteAsset(props: DeleteAssetProps) {
  const { asset, handleDeleteAsset } = props;
  
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <DeleteAssetUI
      asset={asset}
      showModal={showModal}
      handleShowModal={handleToggleModal}
      handleDeleteAsset={handleDeleteAsset}
      closeModal={handleToggleModal}
    />
  );
}

export { DeleteAsset };