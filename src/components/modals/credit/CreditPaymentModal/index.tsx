import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { currencyFormat } from "@utils/currency";
import { formatPrimaryTimestamp } from "@utils/dates";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IAmortization } from "src/model/entity/product";
import { StyledBody, StyledBodyHead, StyledModal } from "./styles";

const renderTransactionSpecification = (
  label: string,
  value: string | number,
) => (
  <Stack gap={inube.spacing.s100} alignItems="center">
    <Stack justifyContent="space-between" width="100%">
      <Text type="label" size="medium" appearance="dark" weight="bold">
        {label}
      </Text>

      <Text type="body" size="small" appearance="gray">
        {currencyFormat(Number(value))}
      </Text>
    </Stack>
  </Stack>
);

interface CreditPaymentModalProps {
  portalId: string;
  payment: IAmortization;
  onCloseModal: () => void;
}

function CreditPaymentModal(props: CreditPaymentModalProps) {
  const { portalId, onCloseModal, payment } = props;

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
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark" weight="bold">
              Detalles del pago
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
            Información detallada de la transacción.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBodyHead>
          <Stack direction="column" gap={inube.spacing.s050}>
            <Stack gap={inube.spacing.s100}>
              <Text type="title" size={"small"} weight="bold">
                Fecha:
              </Text>
              <Text type="label" size="large" appearance="gray">
                {formatPrimaryTimestamp(payment.date)}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s100}>
              <Text type="title" size={"small"} weight="bold">
                Tipo:
              </Text>
              <Text type="label" size="large" appearance="gray">
                {payment.type}
              </Text>
            </Stack>
          </Stack>
        </StyledBodyHead>

        <StyledBody>
          <Text type="label" size="large" appearance="gray" weight="bold">
            Especificación pago mínimo (cuota)
          </Text>

          <Stack direction="column" gap={inube.spacing.s200}>
            {payment.capitalPayment &&
              renderTransactionSpecification(
                "Abono capital:",
                payment.capitalPayment,
              )}
            {payment.interest !== 0 &&
              renderTransactionSpecification(
                "Interés corriente:",
                payment.interest,
              )}
            {payment.lifeInsurance &&
              renderTransactionSpecification(
                "Seguro de vida:",
                payment.lifeInsurance,
              )}
            {payment.patrimonialInsurance &&
              renderTransactionSpecification(
                "Seguro patrimonial:",
                payment.patrimonialInsurance,
              )}
            {payment.capitalization &&
              renderTransactionSpecification(
                "Capitalización:",
                payment.capitalization,
              )}
            {payment.others &&
              renderTransactionSpecification("Otros:", payment.others)}
          </Stack>

          <Stack direction="column" gap={inube.spacing.s150}>
            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="small" appearance="dark" weight="bold">
                Total cuota mensual:
              </Text>

              <Text type="title" size="small" appearance="gray" weight="bold">
                {currencyFormat(payment.totalMonthlyValue)}
              </Text>
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="small" appearance="dark" weight="bold">
                Saldo proyectado:
              </Text>

              <Text type="title" size="small" appearance="gray" weight="bold">
                {currencyFormat(payment.projectedBalance)}
              </Text>
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CreditPaymentModal };
