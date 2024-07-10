import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineAdd, MdOutlineClose, MdOutlineRemove } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";

const renderSpecification = (
  label: string,
  value: string | number,
  icon: React.JSX.Element,
) => (
  <Stack justifyContent="space-between" width="100%" alignItems="center">
    <Stack gap="s100" alignItems="center">
      <Icon icon={icon} appearance="dark" size="16px" spacing="none" />
      <Text type="label" size="medium" appearance="dark">
        {label}
      </Text>
    </Stack>

    <Text type="body" size="small" appearance="gray">
      {value}
    </Text>
  </Stack>
);

interface CreditDisbursementModalProps {
  portalId: string;
  spec: {
    amount: number;
    cycleInterest: number;
    discounts: number;
  };
  approximateValue: number;
  onCloseModal: () => void;
}

function CreditDisbursementModal(props: CreditDisbursementModalProps) {
  const { portalId, spec, approximateValue, onCloseModal } = props;

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
            <Text type="title" size="medium" appearance="dark">
              Desembolso aproximado
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
            Revisa el proceso de amortización de tu solicitud.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBody>
          <Text type="title" size="small" appearance="dark">
            Especificación del desembolso
          </Text>

          <Stack direction="column" gap="s100">
            {spec.amount !== 0 &&
              renderSpecification(
                "Monto",
                currencyFormat(spec.amount),
                <MdOutlineAdd />,
              )}

            {spec.cycleInterest !== 0 &&
              renderSpecification(
                "Intereses anticipados ajuste al ciclo",
                currencyFormat(spec.cycleInterest),
                <MdOutlineRemove />,
              )}

            {spec.discounts !== 0 &&
              renderSpecification(
                "Cargos y descuentos",
                currencyFormat(spec.discounts),
                <MdOutlineRemove />,
              )}
          </Stack>

          <Divider />

          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="small" appearance="dark">
              Valor aproximado a girar:
            </Text>

            <Text type="title" size="small" appearance="gray">
              {currencyFormat(approximateValue)}
            </Text>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CreditDisbursementModal };
