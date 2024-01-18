import { Icon } from "@design/data/Icon";
import { IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import {
  StyledBody,
  StyledBodyHead,
  StyledDivider,
  StyledModal,
} from "./styles";
import { parseCurrencyString } from "src/utils/currency";

const renderTransactionSpecification = (
  label: string,
  value: string | number,
) => (
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
        {value}
      </Text>
    </Stack>
  </Stack>
);

interface CreditPaymentModalProps {
  portalId: string;
  onCloseModal: () => void;
  payment: IEntry;
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
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Pago
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
            Detalles de la transacción
          </Text>
        </Stack>

        <StyledDivider dashed />

        <StyledBodyHead>
          <Text type="title" size="medium" appearance="dark">
            Cuota {payment.paymentNumber} - {payment.date}
          </Text>
        </StyledBodyHead>

        <StyledBody>
          <Text type="title" size="medium" appearance="dark">
            Especificación pago mínimo (cuota)
          </Text>

          <Stack direction="column" gap="s200">
            {payment.capitalPayment &&
              renderTransactionSpecification(
                "Abono capital:",
                payment.capitalPayment,
              )}
            {parseCurrencyString(payment.interest) !== 0 &&
              renderTransactionSpecification(
                "Interés de mora:",
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
          </Stack>

          <Stack direction="column" gap="s150">
            <StyledDivider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Total cuota mensual:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {payment.totalMonthlyValue}
              </Text>
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Saldo proyectado:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {payment.projectedBalance}
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
