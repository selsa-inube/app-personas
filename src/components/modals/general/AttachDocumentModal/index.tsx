import { FileCard } from "@components/cards/FileCard";
import { InfoCard } from "@components/cards/InfoCard";
import { FileDrop } from "@design/input/FileDrop";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { IMessage } from "@ptypes/messages.types";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  MdErrorOutline,
  MdOutlineClose,
  MdOutlineSentimentNeutral,
} from "react-icons/md";
import { ISelectedDocument } from "src/model/entity/service";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { saveDocument } from "src/services/iclient/documents/saveDocument";
import { ISaveDocumentRequest } from "src/services/iclient/documents/saveDocument/types";
import { initialMessageState } from "src/utils/messages";
import { StyledModal } from "./styles";

interface ITempFile extends ISelectedDocument {
  loading?: boolean;
}

interface AttachDocumentModalProps {
  portalId: string;
  maxFileSize: number;
  documentType: string;
  requirementId: string;
  onSelectDocuments: (files: ISelectedDocument[]) => void;
  onCloseModal: () => void;
}

function AttachDocumentModal(props: AttachDocumentModalProps) {
  const {
    portalId,
    maxFileSize,
    documentType,
    requirementId,
    onSelectDocuments,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);
  const { accessToken } = useAuth();
  const [message, setMessage] = useState<IMessage>(initialMessageState);
  const [tempfiles, setTempFiles] = useState<ITempFile[]>([]);

  const handleSelectDocuments = async (fileList: FileList) => {
    const files = [...fileList];
    for (let ix = 0; ix < files.length; ix++) {
      if (files[ix].size > maxFileSize * 1024 * 1024) {
        setMessage({
          show: true,
          title: `El documento excede el límite de ${maxFileSize}MB por archivo.`,
          description: "",
          icon: <MdOutlineSentimentNeutral />,
          appearance: "danger",
        });

        return;
      }

      const id = `${requirementId}-${ix + 1}`;
      setTempFiles([
        ...tempfiles,
        {
          id,
          file: files[ix],
          requirementId,
          loading: true,
        },
      ]);

      const documentRequest: ISaveDocumentRequest = {
        documentType,
        file: files[ix],
      };

      if (!accessToken) return;

      try {
        const documentResponse = await saveDocument(
          documentRequest,
          accessToken,
        );

        setTempFiles((prev) =>
          prev.map((tempfile) => {
            if (tempfile.id === id) {
              return {
                ...tempfile,
                documentType: documentResponse?.documentType,
                sequence: documentResponse?.sequence,
                loading: false,
              };
            }

            return tempfile;
          }),
        );

        setMessage(initialMessageState);
      } catch (error) {
        setMessage({
          show: true,
          title: `Ocurrió un error al subir el documento ${files[ix].name}.`,
          description: "",
          icon: <MdOutlineSentimentNeutral />,
          appearance: "danger",
        });

        setTempFiles((prev) => prev.filter((tempfile) => tempfile.id !== id));
      }
    }
  };

  const handleRemoveDocument = (delFile: ITempFile) => {
    setTempFiles(tempfiles.filter((file) => file.id !== delFile.id));

    if (!accessToken || !delFile.documentType || !delFile.sequence) return;

    removeDocument(
      {
        documentType: delFile.documentType,
        sequence: delFile.sequence,
      },
      accessToken,
    );
  };

  const handleAttachDocuments = () => {
    onSelectDocuments(tempfiles);
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
                autoRows="auto"
              >
                {tempfiles.map((file) => (
                  <FileCard
                    key={file.id}
                    id={file.id}
                    name={file.file.name}
                    size={file.file.size}
                    loading={file.loading}
                    onRemove={() => handleRemoveDocument(file)}
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
