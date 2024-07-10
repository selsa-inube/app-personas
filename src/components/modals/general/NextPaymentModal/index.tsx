import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";

const renderTransactionSpecification = (label: string, value: number) => (
  <Stack gap="s100" alignItems="center">
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
    nextCapital?: number;
    nextInterest?: number;
    nextPastDueInterest?: number;
    nextPenaltyInterest?: number;
    nextLifeInsurance?: number;
    nextOtherConcepts?: number;
    nextCapitalization?: number;
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
            {nextPaymentData.nextCapital &&
              renderTransactionSpecification(
                "Abono capital:",
                nextPaymentData.nextCapital,
              )}

            {nextPaymentData.nextInterest &&
              renderTransactionSpecification(
                "Interés corriente:",
                nextPaymentData.nextInterest,
              )}

            {nextPaymentData.nextPastDueInterest &&
              renderTransactionSpecification(
                "Interés vencido:",
                nextPaymentData.nextPastDueInterest,
              )}

            {nextPaymentData.nextPenaltyInterest &&
              renderTransactionSpecification(
                "Interés de mora:",
                nextPaymentData.nextPenaltyInterest,
              )}

            {nextPaymentData.nextLifeInsurance &&
              renderTransactionSpecification(
                "Seguro de vida:",
                nextPaymentData.nextLifeInsurance,
              )}

            {nextPaymentData.nextOtherConcepts &&
              renderTransactionSpecification(
                "Otros conceptos:",
                nextPaymentData.nextOtherConcepts,
              )}

            {nextPaymentData.nextCapitalization &&
              renderTransactionSpecification(
                "Capitalización:",
                nextPaymentData.nextCapitalization,
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
