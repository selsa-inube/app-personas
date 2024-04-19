import { useState } from "react";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal, StyledCardContainer, StyledTotalPayment } from "./styles";
import { PaymentInformationCard } from "@components/cards/PaymentInformationCard";
import { IPayment } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";

interface PaymentTotalModalProps {
  totalPayment: number;
  selectedPayments?: IPayment[];
  onCloseModal: () => void;
}

function PaymentTotalModal(props: PaymentTotalModalProps) {
  const { onCloseModal, totalPayment, selectedPayments } = props;
  const [payments, setPayments] = useState<IPayment[]>(selectedPayments || []);
  const [totalPaymentValue, setTotalPaymentsValue] = useState(totalPayment);

  const isMobile = useMediaQuery("(max-width: 580px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const node = document.getElementById("modals");

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const removePaymentCard = (paymentId: string, paymentValue: number) => {
    const updatedPayments = payments.filter(
      (payment) => payment.id !== paymentId,
    );
    if (updatedPayments.length === 0) {
      onCloseModal();
    }
    setPayments(updatedPayments);
    setTotalPaymentsValue((prevTotal) => prevTotal - paymentValue);
  };

  return createPortal(
    <Blanket
      justifyContent={isMobile ? "center" : "flex-end"}
      padding={isMobile ? "s0" : "s300"}
    >
      <StyledModal smallScreen={isMobile} tabletScreen={isTablet}>
        <Stack direction="column" gap="s250">
          <Stack direction="column" width="100%" gap="s100">
            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size={isMobile ? "small" : "medium"}>
                Total a pagar hoy
              </Text>
              <Icon
                appearance="dark"
                icon={<MdOutlineClose />}
                onClick={onCloseModal}
                cursorHover={true}
                size="20px"
                spacing="none"
              />
            </Stack>
            <Text
              type="body"
              size={isMobile ? "small" : "medium"}
              appearance="gray"
            >
              Revisa las obligaciones que tiene por pagar.
            </Text>
          </Stack>
          <Divider dashed />
          <StyledCardContainer smallScreen={isMobile} tabletScreen={isTablet}>
            {payments.map((selectedPayment) => (
              <PaymentInformationCard
                key={selectedPayment.id}
                id={selectedPayment.id}
                title={selectedPayment.title}
                description={
                  selectedPayment.options.filter(
                    (option) => option.value === selectedPayment.valueToPay,
                  )[0]?.label
                }
                value={selectedPayment.valueToPay || 0}
                removePaymentCard={removePaymentCard}
              />
            ))}
          </StyledCardContainer>
        </Stack>

        <Stack justifyContent="center" direction="column" gap="s250">
          <Divider dashed />
          <StyledTotalPayment>
            <Text type="label" size="large" appearance="gray">
              Total a pagar hoy:
            </Text>
            <Text type="body" size="medium">
              {currencyFormat(totalPaymentValue)}
            </Text>
          </StyledTotalPayment>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { PaymentTotalModal };
