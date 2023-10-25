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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <DeleteReferenceUI
      reference={reference}
      showModal={showModal}
      handleShowModal={handleShowModal}
      handleDeleteUser={handleDeleteReference}
      closeModal={closeModal}
    />
  );
}

export { DeleteReference };
