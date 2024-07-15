import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";

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

interface ExpiredPaymentModalProps {
  portalId: string;
  expiredPaymentData: {
    expiredCapital?: number;
    expiredInterest?: number;
    expiredPastDueInterest?: number;
    expiredPenaltyInterest?: number;
    expiredLifeInsurance?: number;
    expiredOtherConcepts?: number;
    expiredCapitalization?: number;
    expiredValue: number;
  };
  onCloseModal: () => void;
}

function ExpiredPaymentModal(props: ExpiredPaymentModalProps) {
  const { portalId, expiredPaymentData, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Valor vencido
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
            Conceptos detallados del valor vencido.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBody>
          <Text type="title" size="medium" appearance="dark">
            Especificación del pago
          </Text>

          <Stack direction="column" gap="s200">
            {expiredPaymentData.expiredCapital &&
              renderTransactionSpecification(
                "Capital:",
                expiredPaymentData.expiredCapital,
              )}

            {expiredPaymentData.expiredInterest &&
              renderTransactionSpecification(
                "Interés corriente:",
                expiredPaymentData.expiredInterest,
              )}

            {expiredPaymentData.expiredPastDueInterest &&
              renderTransactionSpecification(
                "Interés vencido:",
                expiredPaymentData.expiredPastDueInterest,
              )}

            {expiredPaymentData.expiredPenaltyInterest &&
              renderTransactionSpecification(
                "Interés de mora:",
                expiredPaymentData.expiredPenaltyInterest,
              )}

            {expiredPaymentData.expiredLifeInsurance &&
              renderTransactionSpecification(
                "Seguro de vida:",
                expiredPaymentData.expiredLifeInsurance,
              )}

            {expiredPaymentData.expiredOtherConcepts &&
              renderTransactionSpecification(
                "Otros conceptos:",
                expiredPaymentData.expiredOtherConcepts,
              )}

            {expiredPaymentData.expiredCapitalization &&
              renderTransactionSpecification(
                "Capitalización:",
                expiredPaymentData.expiredCapitalization,
              )}
          </Stack>

          <Stack direction="column" gap="s150">
            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Valor vencido:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {currencyFormat(expiredPaymentData.expiredValue)}
              </Text>
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ExpiredPaymentModal };
