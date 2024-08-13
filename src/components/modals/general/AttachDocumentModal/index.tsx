import { FileCard } from "@components/cards/FileCard";
import { InfoCard } from "@components/cards/InfoCard";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { FileDrop } from "@design/input/FileDrop";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { IMessage } from "@ptypes/messages.types";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  MdErrorOutline,
  MdOutlineClose,
  MdOutlineSentimentNeutral,
} from "react-icons/md";
import { saveDocument } from "src/services/iclient/documents/saveDocument";
import { ISaveDocumentRequest } from "src/services/iclient/documents/saveDocument/types";
import { initialMessageState } from "src/utils/messages";
import { StyledModal } from "./styles";

interface ITempFile {
  id: string;
  file: File;
  loading?: boolean;
}

interface AttachDocumentModalProps {
  portalId: string;
  maxFileSize: number;
  requirementId: string;
  onSelectDocuments: (files: FileList) => void;
  onCloseModal: () => void;
}

function AttachDocumentModal(props: AttachDocumentModalProps) {
  const {
    portalId,
    maxFileSize,
    requirementId,
    onSelectDocuments,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);
  const { accessToken } = useAuth();
  const [message, setMessage] = useState<IMessage>(initialMessageState);
  const [tempfiles, setTempFiles] = useState<ITempFile[]>([]);

  const handleSelectDocuments = async (files: FileList) => {
    for (const file of [...files]) {
      if (file.size > maxFileSize * 1024 * 1024) {
        setMessage({
          show: true,
          title: `El documento excede el límite de ${maxFileSize}MB por archivo.`,
          description: "",
          icon: <MdOutlineSentimentNeutral />,
          appearance: "danger",
        });

        return;
      }

      setTempFiles([...tempfiles, { id: file.name, file, loading: true }]);

      const documentRequest: ISaveDocumentRequest = {
        documentType: requirementId,
        file,
      };

      if (!accessToken) return;

      try {
        await saveDocument(documentRequest, accessToken);

        setTempFiles((prev) =>
          prev.map((tempfile) => {
            if (tempfile.id === file.name) {
              return { ...tempfile, loading: false };
            }

            return tempfile;
          }),
        );

        setMessage(initialMessageState);
      } catch (error) {
        setMessage({
          show: true,
          title: `Ocurrió un error al subir el documento ${file.name}.`,
          description: "",
          icon: <MdOutlineSentimentNeutral />,
          appearance: "danger",
        });
      }
    }
  };

  const handleRemoveDocument = (id: string) => {
    setTempFiles(tempfiles.filter((file) => file.id !== id));
  };

  const handleAttachDocuments = () => {
    const dataTransfer = new DataTransfer();
    tempfiles.forEach((file) => dataTransfer.items.add(file.file));
    onSelectDocuments(dataTransfer.files);
    onCloseModal();
  };

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

        <Stack direction="column" gap={inube.spacing.s150}>
          <FileDrop onSelectFiles={handleSelectDocuments} />

          <Text type="body" size="medium" appearance="gray">
            Peso máximo por archivo: {maxFileSize}MB
          </Text>
        </Stack>

        {message.show ? (
          <InfoCard
            title={message.title}
            appearance="danger"
            icon={<MdErrorOutline />}
          />
        ) : (
          tempfiles.length > 0 && (
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium">
                Documentos adjuntos
              </Text>

              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                gap={inube.spacing.s200}
              >
                {tempfiles.map((file) => (
                  <FileCard
                    key={file.id}
                    id={file.id}
                    name={file.file.name}
                    size={file.file.size}
                    loading={file.loading}
                    onRemove={handleRemoveDocument}
                  />
                ))}
              </Grid>

              <Stack justifyContent="flex-end" gap={inube.spacing.s150}>
                <Button
                  appearance="gray"
                  spacing="compact"
                  variant="outlined"
                  onClick={onCloseModal}
                >
                  Cancelar
                </Button>

                <Button
                  appearance="primary"
                  spacing="compact"
                  onClick={handleAttachDocuments}
                >
                  Adjuntar
                </Button>
              </Stack>
            </Stack>
          )
        )}
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { AttachDocumentModal };
