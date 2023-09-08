import { InvestmentMovementModal } from "@components/modals/investment/InvestmentMovementModal";
import { Icon } from "@design/data/Icon";
import { IMovement } from "@ptypes/pages/product.types";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewInvestmentMovementProps {
  movement: IMovement;
}

function ViewInvestmentMovement(props: ViewInvestmentMovementProps) {
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
        <InvestmentMovementModal
          portalId="modals"
          onCloseModal={handleToggleModal}
          movement={movement}
        />
      )}
    </>
  );
}

export { ViewInvestmentMovement };
