import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { createPortal } from "react-dom";
import {
  MdClear,
  MdOutlineCurrencyExchange,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import { StyledModal } from "./styles";

interface ActionsModalProps {
  portalId?: string;
  onChangeQuota: () => void;
  onModifyAction: () => void;
  onCancelSaving: () => void;
  onCloseModal: () => void;
}

function ActionsModal(props: ActionsModalProps) {
  const {
    portalId = "modals",
    onChangeQuota,
    onModifyAction,
    onCancelSaving,
    onCloseModal,
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
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text
              type="title"
              appearance="dark"
              size={isMobile ? "small" : "medium"}
              weight="bold"
            >
              Acciones
            </Text>

            <Icon
              appearance="dark"
              icon={<MdClear />}
              onClick={onCloseModal}
              cursorHover={true}
              size="24px"
              spacing="narrow"
            />
          </Stack>

          <Text type="body" size="medium" appearance="gray">
            Explora las opciones adicionales de tu ahorro programado.
          </Text>
        </Stack>

        <Divider dashed />

        <Stack direction="column" gap={inube.spacing.s200}>
          <OutlineCard>
            <Stack
              justifyContent="space-between"
              padding={
                isMobile
                  ? `${inube.spacing.s200} ${inube.spacing.s150}`
                  : inube.spacing.s200
              }
              alignItems={isMobile ? "flex-start" : "center"}
              width="100%"
              gap={isMobile ? inube.spacing.s100 : inube.spacing.s0}
              direction={isMobile ? "column" : "row"}
            >
              <Stack direction="column" gap={inube.spacing.s050}>
                <Text type="title" size="small" weight="bold">
                  Cambiar cuota
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Cambia el valor de la cuota de tu ahorro programado.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineCurrencyExchange />}
                spacing="compact"
                onClick={onChangeQuota}
                fullwidth={isMobile}
              >
                Cambiar
              </Button>
            </Stack>
          </OutlineCard>

          <OutlineCard>
            <Stack
              justifyContent="space-between"
              padding={inube.spacing.s200}
              width="100%"
              direction={isMobile ? "column" : "row"}
              alignItems={isMobile ? "flex-start" : "center"}
              gap={isMobile ? inube.spacing.s100 : inube.spacing.s0}
            >
              <Stack direction="column" gap={inube.spacing.s050}>
                <Text type="title" size="small" weight="bold">
                  Modificar la acción al vencimiento
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Modifica la decisión tomada cuando se vence tu ahorro
                  programado.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineEdit />}
                spacing="compact"
                onClick={onModifyAction}
                fullwidth={isMobile}
              >
                Modificar
              </Button>
            </Stack>
          </OutlineCard>

          <OutlineCard>
            <Stack
              justifyContent="space-between"
              padding={inube.spacing.s200}
              width="100%"
              direction={isMobile ? "column" : "row"}
              alignItems={isMobile ? "flex-start" : "center"}
              gap={isMobile ? inube.spacing.s100 : inube.spacing.s0}
            >
              <Stack direction="column" gap={inube.spacing.s050}>
                <Text type="title" size="small" weight="bold">
                  Cancelar ahorro
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Cancela de forma definitiva tu ahorro programado.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineDelete />}
                spacing="compact"
                onClick={onCancelSaving}
                fullwidth={isMobile}
                appearance="danger"
              >
                Cancelar
              </Button>
            </Stack>
          </OutlineCard>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ActionsModal };
export type { ActionsModalProps };
