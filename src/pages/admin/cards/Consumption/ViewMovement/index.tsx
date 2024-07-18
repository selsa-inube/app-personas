import { SavingMovementModal } from "@components/modals/saving/SavingMovementModal";
import { IEntry } from "@design/data/Table/types";
import { Icon } from "@inubekit/icon";
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
        spacing="narrow"
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

export { ViewMovement };
