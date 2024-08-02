import { Text } from "@design/data/Text";
import { FileDrop } from "@design/input/FileDrop";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal } from "./styles";

interface AttachDocumentModalProps {
  portalId: string;
  maxFileSize: number;
  onSelectDocuments: (files: FileList) => void;
  onRemoveDocument: (id: string) => void;
  onCloseModal: () => void;
}

function AttachDocumentModal(props: AttachDocumentModalProps) {
  const { portalId, maxFileSize, onSelectDocuments, onCloseModal } = props;

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
              Adjuntar documento
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
            Adjunta los documentos para tu solicitud de producto.
          </Text>
        </Stack>

        <Divider dashed />

        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack direction="column" gap={inube.spacing.s150}>
            <FileDrop onSelectFiles={onSelectDocuments} />

            <Text type="body" size="medium" appearance="gray">
              Peso máximo por archivo: {maxFileSize}MB
            </Text>
          </Stack>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { AttachDocumentModal };
