import { useState } from "react";
import { DeleteReferenceUI } from "./interface";
import { IEntry } from "@design/data/Table/types";

interface DeleteReferenceProps {
  reference: IEntry;
  handleDeleteReference: () => void;
}

function DeleteReference(props: DeleteReferenceProps) {
  const { reference, handleDeleteReference } = props;
  
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <DeleteReferenceUI
      reference={reference}
      showModal={showModal}
      handleShowModal={handleToggleModal}
      handleDeleteUser={handleDeleteReference}
      closeModal={handleToggleModal}
    />
  );
}

export { DeleteReference };
