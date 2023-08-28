import { CreditMovementModal } from "@components/modals/credit/CreditMovementModal";
import { IMovement } from "@ptypes/pages/product.types";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewMovementProps {
  movement: IMovement;
}

function ViewMovement(props: ViewMovementProps) {
  const { movement } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <MdOpenInNew cursor="pointer" onClick={handleToggleModal} size={16} />
      {showModal && (
        <CreditMovementModal
          portalId="modals"
          onCloseModal={handleToggleModal}
          movement={movement}
        />
      )}
    </>
  );
}

export { ViewMovement };
