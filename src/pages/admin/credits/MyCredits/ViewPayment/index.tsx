import { CreditPaymentModal } from "@components/modals/credit/CreditPaymentModal";
import { IEntry } from "@design/data/Table/types";
import { Icon } from "@inubekit/icon";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";

interface ViewPaymentProps {
  payment: IEntry;
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
