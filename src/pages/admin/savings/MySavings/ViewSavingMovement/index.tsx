import { SavingMovementModal } from "@components/modals/saving/SavingMovementModal";
import { Icon } from "@design/data/Icon";
import { IMovement } from "@ptypes/pages/product.types";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewSavingMovementProps {
  movement: IMovement;
}

function ViewSavingMovement(props: ViewSavingMovementProps) {
  const { movement } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Icon
        appearance="dark"
        onClick={handleToggleModal}
        icon={<MdOpenInNew />}
        cursorHover={true}
        size="16px"
        spacing="none"
      />
      {showModal && (
        <SavingMovementModal
          portalId="modals"
          onCloseModal={handleToggleModal}
          movement={movement}
        />
      )}
    </>
  );
}

export { ViewSavingMovement };
