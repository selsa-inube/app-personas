import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledBody, StyledModal } from "./styles";

interface CancelModalProps {
  portalId: string;
  loading?: boolean;
  disbursementMethod?: string;
  account?: string;
  onCloseModal: () => void;
  onClick: () => void;
}

function CancelModal(props: CancelModalProps) {
  const {
    portalId,
    loading = true,
    disbursementMethod,
    account,
    onCloseModal,
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text
            type="title"
            appearance="dark"
            weight="bold"
            size={isMobile ? "small" : "medium"}
          >
            Cancelar ahorro por anticipado
          </Text>
          <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text
            type="body"
            appearance="gray"
            size={isMobile ? "small" : "large"}
          >
            ¿Estas seguro? Analizaremos tu solicitud y determinaremos las
            condiciones para la cancelación.
          </Text>

          <StyledBody>
            <Stack direction="column">
              <Text type="label" size="large" weight="bold">
                Forma de desembolso:
              </Text>

              <Text type="label" size="large" appearance="gray">
                {disbursementMethod}
              </Text>
            </Stack>

            <Stack direction="column">
              <Text type="label" size="large" weight="bold">
                Cuenta:
              </Text>

              <Text type="label" size="large" appearance="gray">
                {account}
              </Text>
            </Stack>
          </StyledBody>
        </Stack>
        <Stack justifyContent="flex-end" gap={inube.spacing.s100}>
          <Button
            appearance="gray"
            onClick={onCloseModal}
            spacing="compact"
            variant="outlined"
          >
            Continuar
          </Button>
          <Button
            appearance="danger"
            loading={loading}
            onClick={onClick}
            spacing="compact"
          >
            Cancelar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CancelModal };
export type { CancelModalProps };
