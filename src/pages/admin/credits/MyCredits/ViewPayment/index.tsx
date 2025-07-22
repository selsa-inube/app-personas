import { CreditPaymentModal } from "@components/modals/credit/CreditPaymentModal";
import { Icon } from "@inubekit/inubekit";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { IAmortization } from "src/model/entity/product";

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
        appearance="primary"
        onClick={handleToggleModal}
        icon={<MdOpenInNew />}
        cursorHover={true}
        size="16px"
        spacing="narrow"
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
