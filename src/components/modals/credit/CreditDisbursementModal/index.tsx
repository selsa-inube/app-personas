import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { createPortal } from "react-dom";
import { MdOutlineAdd, MdOutlineClose, MdOutlineRemove } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledModal } from "./styles";

const renderSpecification = (
  label: string,
  value: string | number,
  icon: React.JSX.Element,
) => (
  <Stack justifyContent="space-between" width="100%" alignItems="center">
    <Stack gap={inube.spacing.s100} alignItems="center">
      <Icon icon={icon} appearance="dark" size="16px" spacing="narrow" />
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
    anticipatedInterest: number;
    discounts: number;
    charges: number;
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
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
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
              spacing="narrow"
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

          <Stack direction="column" gap={inube.spacing.s100}>
            {renderSpecification(
              "Monto",
              currencyFormat(spec.amount),
              <MdOutlineAdd />,
            )}

            {renderSpecification(
              "Intereses anticipados ajuste al ciclo",
              currencyFormat(spec.anticipatedInterest),
              <MdOutlineRemove />,
            )}

            {renderSpecification(
              "Descuentos",
              currencyFormat(spec.discounts),
              <MdOutlineRemove />,
            )}

            {renderSpecification(
              "Cargos",
              currencyFormat(spec.charges),
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
