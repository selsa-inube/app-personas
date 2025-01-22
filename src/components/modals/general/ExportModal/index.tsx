import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
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
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text
              type="title"
              appearance="dark"
              size={isMobile ? "small" : "medium"}
            >
              Exportar
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
            Exporta y comparte tus documentos.
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
                fullwidth={isMobile}
              >
                Descargar
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
                <Text type="title" size="small">
                  Compartir
                </Text>

                <Text type="body" size="small" appearance="gray">
                  Comparte el reporte mediante otra aplicación.
                </Text>
              </Stack>

              <Button
                variant="outlined"
                iconBefore={<MdOutlineShare />}
                spacing="compact"
                onClick={onShare}
                fullwidth={isMobile}
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
