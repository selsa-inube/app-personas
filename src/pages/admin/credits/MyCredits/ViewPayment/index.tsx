import { CreditPaymentModal } from "@components/modals/credit/CreditPaymentModal";
import { Icon } from "@design/data/Icon";
import { IAmortization } from "@ptypes/pages/product.types";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewPaymentProps {
  payment: IAmortization;
}

function ViewPayment(props: ViewPaymentProps) {
  const { payment } = props;

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
        <CreditPaymentModal
          portalId="modals"
          onCloseModal={handleToggleModal}
          payment={payment}
        />
      )}
    </>
  );
}

export { ViewPayment };
