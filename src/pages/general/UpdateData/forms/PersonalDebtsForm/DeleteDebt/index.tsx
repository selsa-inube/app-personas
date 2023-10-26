import { useState } from "react";
import { DeleteDebtUI } from "./interface";
import { IEntry } from "@design/data/Table/types";

interface DeleteDebtProps {
  debt: IEntry;
  handleDeleteDebt: () => void;
}

function DeleteDebt(props: DeleteDebtProps) {
  const { debt, handleDeleteDebt } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <DeleteDebtUI
      debt={debt}
      showModal={showModal}
      handleShowModal={handleToggleModal}
      handleDeleteDebt={handleDeleteDebt}
      closeModal={handleToggleModal}
    />
  );
}

export { DeleteDebt };
