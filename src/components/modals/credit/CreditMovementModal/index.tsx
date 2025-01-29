import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { StyledBody, StyledBodyHead, StyledModal } from "./styles";

const renderTransactionSpecification = (label: string, value?: number) => (
  <Stack gap={inube.spacing.s100} alignItems="center">
    <Stack justifyContent="space-between" width="100%">
      <Text type="label" size="medium" appearance="dark">
        {label}
      </Text>

      <Text type="body" size="small" appearance="gray">
        {typeof value === "number" ? currencyFormat(value) : value}
      </Text>
    </Stack>
  </Stack>
);

interface CreditMovementModalProps {
  portalId: string;
  onCloseModal: () => void;
  movement: {
    id?: string;
    date: Date;
    reference?: string;
    description?: string;
    totalValue: number;
    type?: string;
    capitalPayment?: number;
    interest?: number;
    lifeInsurance?: number;
    patrimonialInsurance?: number;
    capitalization?: number;
    commission?: number;
  };
}

function CreditMovementModal(props: CreditMovementModalProps) {
  const { portalId, onCloseModal, movement } = props;

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
        <Stack direction="column" width="100%">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Movimiento
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
            Detalles de la transacción
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBodyHead>
          <Text type="title" size="medium" appearance="dark">
            {`${movement.reference} - ${formatPrimaryDate(movement.date)}`}
          </Text>

          <Stack gap={inube.spacing.s100} alignItems="center">
            <Text type="label" size="medium" appearance="dark">
              Descripción:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {movement?.description}
            </Text>
          </Stack>
        </StyledBodyHead>

        <StyledBody>
          <Text type="title" size="medium" appearance="dark">
            Especificación de la transacción
          </Text>

          <Stack direction="column" gap={inube.spacing.s200}>
            {movement?.capitalPayment &&
              renderTransactionSpecification(
                "Abono capital:",
                movement.capitalPayment,
              )}
            {movement?.interest &&
              renderTransactionSpecification(
                "Interés corriente:",
                movement.interest,
              )}
            {movement?.lifeInsurance &&
              renderTransactionSpecification(
                "Seguro de vida:",
                movement.lifeInsurance,
              )}
            {movement?.patrimonialInsurance &&
              renderTransactionSpecification(
                "Seguro patrimonial:",
                movement.patrimonialInsurance,
              )}
            {movement?.capitalization &&
              renderTransactionSpecification(
                "Capitalización:",
                movement.capitalization,
              )}
            {movement?.commission &&
              renderTransactionSpecification("Comisión:", movement.commission)}
          </Stack>

          <Stack direction="column" gap={inube.spacing.s150}>
            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Total:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {currencyFormat(movement?.totalValue)}
              </Text>
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CreditMovementModal };
