import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";
import {
  ICurrentPaymentData,
  IExpiredPaymentData,
  INextPaymentData,
  PaymentType,
} from "./types";

const renderTransactionSpecification = (label: string, value: number) => (
  <Stack gap={inube.spacing.s100} alignItems="center">
    <Stack justifyContent="space-between" width="100%">
      <Text type="label" size="medium" appearance="gray">
        {label}
      </Text>
      <Text type="body" size="small">
        {currencyFormat(value)}
      </Text>
    </Stack>
  </Stack>
);

interface NextPaymentModalProps {
  portalId: string;
  nextPaymentData: INextPaymentData;
  expiredPaymentData?: IExpiredPaymentData;
  currentPaymentData?: ICurrentPaymentData;
  type: PaymentType;
  onCloseModal: () => void;
}

function NextPaymentModal(props: NextPaymentModalProps) {
  const {
    portalId,
    nextPaymentData,
    expiredPaymentData,
    currentPaymentData,
    onCloseModal,
    type,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const hasExpiredValue =
    expiredPaymentData?.expiredValue !== undefined &&
    expiredPaymentData.expiredValue > 0;
    
  const hasCurrentValue =
    currentPaymentData?.currentValue !== undefined &&
    currentPaymentData.currentValue > 0;

  const renderCredit = () => (
    <>
      {hasExpiredValue && (
        <Stack direction="column" gap={inube.spacing.s150}>
          <Text type="label" size="medium" weight="bold">
            Valor vencido:
          </Text>
          <Stack direction="column" gap={inube.spacing.s050}>
            {expiredPaymentData?.expiredCapital &&
              renderTransactionSpecification(
                "Capital vencido:",
                expiredPaymentData.expiredCapital,
              )}
            {expiredPaymentData?.expiredInterest &&
              renderTransactionSpecification(
                "Interés corriente:",
                expiredPaymentData.expiredInterest,
              )}
            {expiredPaymentData?.expiredPastDueInterest &&
              renderTransactionSpecification(
                "Interés vencido:",
                expiredPaymentData.expiredPastDueInterest,
              )}
            {expiredPaymentData?.expiredPenaltyInterest &&
              renderTransactionSpecification(
                "Interés de mora:",
                expiredPaymentData.expiredPenaltyInterest,
              )}
            {expiredPaymentData?.expiredLifeInsurance &&
              renderTransactionSpecification(
                "Seguro de vida:",
                expiredPaymentData.expiredLifeInsurance,
              )}
            {expiredPaymentData?.expiredOtherConcepts &&
              renderTransactionSpecification(
                "Otros conceptos:",
                expiredPaymentData.expiredOtherConcepts,
              )}
            {expiredPaymentData?.expiredCapitalization &&
              renderTransactionSpecification(
                "Capitalización:",
                expiredPaymentData.expiredCapitalization,
              )}
          </Stack>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            gap={inube.spacing.s075}
          >
            <Text type="label" size="medium" appearance="gray" weight="bold">
              Subtotal:
            </Text>
            <Text type="label" size="medium" weight="bold">
              {currencyFormat(expiredPaymentData?.expiredValue)}
            </Text>
          </Stack>
        </Stack>
      )}

      {hasExpiredValue && hasCurrentValue && <Divider dashed />}

      {hasCurrentValue && (
        <Stack direction="column">
          <Stack direction="column" gap={inube.spacing.s150}>
            <Text type="label" size="medium" weight="bold">
              Valor siguiente cuota:
            </Text>
            <Stack direction="column" gap={inube.spacing.s050}>
              {currentPaymentData?.currentCapital &&
                renderTransactionSpecification(
                  "Abono capital:",
                  currentPaymentData.currentCapital,
                )}
              {currentPaymentData?.currentInterest &&
                renderTransactionSpecification(
                  "Interés corriente:",
                  currentPaymentData.currentInterest,
                )}
              {currentPaymentData?.currentPastDueInterest &&
                renderTransactionSpecification(
                  "Interés vencido:",
                  currentPaymentData.currentPastDueInterest,
                )}
              {currentPaymentData?.currentPenaltyInterest &&
                renderTransactionSpecification(
                  "Interés de mora:",
                  currentPaymentData.currentPenaltyInterest,
                )}
              {currentPaymentData?.currentLifeInsurance &&
                renderTransactionSpecification(
                  "Seguro de vida:",
                  currentPaymentData.currentLifeInsurance,
                )}
              {currentPaymentData?.currentOtherConcepts &&
                renderTransactionSpecification(
                  "Otros conceptos:",
                  currentPaymentData.currentOtherConcepts,
                )}
              {currentPaymentData?.currentCapitalization &&
                renderTransactionSpecification(
                  "Capitalización:",
                  currentPaymentData.currentCapitalization,
                )}
            </Stack>
            <Stack
              justifyContent="flex-end"
              alignItems="center"
              gap={inube.spacing.s075}
            >
              <Text type="label" size="medium" appearance="gray" weight="bold">
                Subtotal:
              </Text>
              <Text type="label" size="medium" weight="bold">
                {currencyFormat(currentPaymentData?.currentValue || 0)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Stack direction="column" gap={inube.spacing.s150}>
        <Divider dashed />
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          gap={inube.spacing.s075}
        >
          <Text type="title" size="small" appearance="gray" weight="bold">
            Total:
          </Text>
          <Text type="title" size="small" weight="bold">
            {currencyFormat(nextPaymentData.nextPaymentValue)}
          </Text>
        </Stack>
      </Stack>
    </>
  );

  const renderCommitment = () => (
    <>
      <Text type="title" size="medium" appearance="dark">
        Especificación del pago
      </Text>
      <Stack direction="column" gap={inube.spacing.s200}>
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
      <Stack direction="column" gap={inube.spacing.s150}>
        <Divider />
        <Stack justifyContent="space-between" alignItems="center">
          <Text type="title" size="medium" appearance="gray">
            Total:
          </Text>
          <Text type="title" size="medium" appearance="dark">
            {currencyFormat(nextPaymentData.nextPaymentValue)}
          </Text>
        </Stack>
      </Stack>
    </>
  );

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
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
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Conceptos detallados del próximo pago.
          </Text>
        </Stack>
        <Divider dashed />
        <StyledBody>
          {type === "credit" ? renderCredit() : renderCommitment()}
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { NextPaymentModal };
