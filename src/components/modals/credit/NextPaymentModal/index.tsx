import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";

const renderTransactionSpecification = (label: string, value: number) => (
  <Stack gap="s100" alignItems="center">
    <Icon
      appearance="dark"
      icon={<MdAdd />}
      cursorHover={true}
      size="16px"
      spacing="none"
    />
    <Stack justifyContent="space-between" width="100%">
      <Text type="label" size="medium" appearance="dark">
        {label}
      </Text>

      <Text type="body" size="small" appearance="gray">
        {currencyFormat(value)}
      </Text>
    </Stack>
  </Stack>
);

interface NextPaymentModalProps {
  portalId: string;
  nextPaymentData: {
    nextPaymentCapital?: number;
    nextPaymentInterest?: number;
    nextPaymentArrearsInterest?: number;
    nextPaymentValue: number;
  };
  onCloseModal: () => void;
}

function NextPaymentModal(props: NextPaymentModalProps) {
  const { portalId, nextPaymentData, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Total próximo pago
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
          <Text type="body" size="medium" appearance="gray">
            Conceptos detallados del próximo pago.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBody>
          <Text type="title" size="medium" appearance="dark">
            Especificación del pago
          </Text>

          <Stack direction="column" gap="s200">
            {nextPaymentData.nextPaymentCapital &&
              renderTransactionSpecification(
                "Abono capital:",
                nextPaymentData.nextPaymentCapital,
              )}

            {nextPaymentData.nextPaymentInterest &&
              renderTransactionSpecification(
                "Interés corriente:",
                nextPaymentData.nextPaymentInterest,
              )}

            {nextPaymentData.nextPaymentArrearsInterest &&
              renderTransactionSpecification(
                "Interés de mora:",
                nextPaymentData.nextPaymentArrearsInterest,
              )}
          </Stack>

          <Stack direction="column" gap="s150">
            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Pago total:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {currencyFormat(nextPaymentData.nextPaymentValue)}
              </Text>
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { NextPaymentModal };
