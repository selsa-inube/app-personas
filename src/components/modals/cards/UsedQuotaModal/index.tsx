import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";

const renderTransactionSpecification = (label: string, value: number) => (
  <Stack gap={inube.spacing.s100} alignItems="center">
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

interface UsedQuotaModalProps {
  portalId: string;
  usedQuotaData: {
    currentConsumption?: number;
    accumulatedDebt?: number;
    transactionsProcess?: number;
    usedQuotaValue: number;
  };
  onCloseModal: () => void;
}

function UsedQuotaModal(props: UsedQuotaModalProps) {
  const { portalId, usedQuotaData, onCloseModal } = props;

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
            <Text type="title" size="large" appearance="dark">
              Cupo usado
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
            Visualiza los detalles del cupo usado
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBody>
          <Text type="title" size="medium" appearance="dark">
            Especificación del cupo
          </Text>

          <Stack direction="column" gap={inube.spacing.s200}>
            {!!usedQuotaData.currentConsumption &&
              renderTransactionSpecification(
                "Consumos vigentes:",
                usedQuotaData.currentConsumption,
              )}

            {usedQuotaData.accumulatedDebt &&
              String(usedQuotaData.accumulatedDebt).length &&
              renderTransactionSpecification(
                "Deuda acumulada:",
                usedQuotaData.accumulatedDebt,
              )}

            {renderTransactionSpecification(
              "Transacciones en proceso:",
              usedQuotaData.transactionsProcess || 0,
            )}
          </Stack>

          <Stack direction="column" gap={inube.spacing.s150}>
            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text type="title" size="medium" appearance="gray">
                Total:
              </Text>

              <Text type="title" size="medium" appearance="dark">
                {currencyFormat(usedQuotaData.usedQuotaValue)}
              </Text>
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { UsedQuotaModal };
