import { CreditMovementModal } from "@components/modals/credit/CreditMovementModal";
import { Icon } from "@design/data/Icon";
import { IEntry } from "@design/data/Table/types";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewMovementProps {
  movement: IEntry;
}

function ViewMovement(props: ViewMovementProps) {
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
