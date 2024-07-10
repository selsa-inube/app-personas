import { PaymentInformationCard } from "@components/cards/payments/PaymentInformationCard";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IPayment } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import { StyledCardContainer, StyledModal, StyledTotalPayment } from "./styles";
import { Divider } from "@inubekit/divider";

interface PaymentTotalModalProps {
  totalPayment: number;
  selectedPayments?: IPayment[];
  onCloseModal: () => void;
  onRemovePayment: (paymentId: string) => void;
  onUpdateTotalPayment: (newTotal: number) => void;
}

function PaymentTotalModal(props: PaymentTotalModalProps) {
  const {
    totalPayment,
    selectedPayments = [],
    onCloseModal,
    onRemovePayment,
    onUpdateTotalPayment,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById("modals");

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const getDescription = (payment: IPayment) => {
    if (payment.options && payment.valueToPay) {
      const selectedOption = payment.options.find(
        (option) => option.value === payment.valueToPay,
      );
      if (selectedOption) return selectedOption.label;
    }
    if (payment.applyPayOption) return payment.applyPayOption.label || "";
    return "";
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size={isMobile ? "small" : "medium"}>
              Total a pagar hoy
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              size="20px"
              spacing="none"
              cursorHover
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

        <StyledCardContainer>
          {selectedPayments.map((selectedPayment) => (
            <PaymentInformationCard
              key={selectedPayment.id}
              id={selectedPayment.id}
              title={selectedPayment.title}
              description={getDescription(selectedPayment)}
              value={selectedPayment.valueToPay || 0}
              removePaymentCard={() => {
                onRemovePayment(selectedPayment.id);
                onUpdateTotalPayment(
                  totalPayment - (selectedPayment.valueToPay || 0),
                );
              }}
            />
          ))}
        </StyledCardContainer>

        <Divider dashed />

        <StyledTotalPayment>
          <Text type="label" size="large" appearance="gray">
            Total a pagar hoy:
          </Text>
          <Text type="body" size="medium">
            {currencyFormat(totalPayment)}
          </Text>
        </StyledTotalPayment>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { PaymentTotalModal };
