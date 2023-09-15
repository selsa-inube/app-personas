import { InvestmentMovementModal } from "@components/modals/investment/InvestmentMovementModal";
import { Icon } from "@design/data/Icon";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { IMovement } from "src/model/entity/product";

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
