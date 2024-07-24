import { OutlineCard } from "@components/cards/OutlineCard";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { StyledModal } from "./styles";

interface ExportModalProps {
  portalId?: string;
  onDownload: () => void;
  onShare: () => void;
  onCloseModal?: () => void;
}

function ExportModal(props: ExportModalProps) {
  const { portalId = "modals", onDownload, onShare, onCloseModal } = props;

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
          <Stack gap={inube.spacing.s100}>
            <Text
              type="title"
              appearance="dark"
              size={isMobile ? "small" : "medium"}
            >
              Exportar reporte
            </Text>
          </Stack>
          <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
        </Stack>

        <Stack direction="column" gap={inube.spacing.s200}>
          <OutlineCard>
            <Stack
              justifyContent="space-between"
              padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
              alignItems="center"
              width="100%"
            >
              <Stack direction="column">
                <Text type="title" size="small">
                  Descargar como PDF
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Guardar localmente en formato PDF.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineFileDownload />}
                spacing="compact"
                onClick={onDownload}
              >
                Descargar
              </Button>
            </Stack>
          </OutlineCard>

          <OutlineCard>
            <Stack
              justifyContent="space-between"
              padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
              alignItems="center"
              width="100%"
            >
              <Stack direction="column">
                <Text type="title" size="small">
                  Compartir reporte
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Enviar reporte a otra aplicación.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineShare />}
                spacing="compact"
                onClick={onShare}
              >
                Compartir
              </Button>
            </Stack>
          </OutlineCard>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ExportModal };
export type { ExportModalProps };
