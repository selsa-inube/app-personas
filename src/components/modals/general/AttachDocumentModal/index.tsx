import { FileCard } from "@components/cards/FileCard";
import { FileDrop } from "@design/input/FileDrop";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import {
  Blanket,
  Button,
  Divider,
  Icon,
  Message,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { IMessage } from "@ptypes/messages.types";
import { mapRequestErrorToTag } from "@utils/handleErrors";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose, MdOutlineSentimentNeutral } from "react-icons/md";
import { AppContext } from "src/context/app";
import { RequestType } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { captureNewError } from "src/services/errors/handleErrors";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { saveDocument } from "src/services/iclient/documents/saveDocument";
import { ISaveDocumentRequest } from "src/services/iclient/documents/saveDocument/types";
import { StyledModal } from "./styles";

interface ITempFile extends ISelectedDocument {
  loading?: boolean;
}

interface AttachDocumentModalProps {
  portalId: string;
  maxFileSize: number;
  requirementDocument: ISelectedDocument;
  requestType: RequestType;
  onSelectDocuments: (files: ISelectedDocument[]) => void;
  onCloseModal: () => void;
}

function AttachDocumentModal(props: AttachDocumentModalProps) {
  const {
    portalId,
    maxFileSize,
    requirementDocument,
    requestType,
    onSelectDocuments,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [message, setMessage] = useState<IMessage>({
    show: false,
    title: "",
    description: "",
    icon: <></>,
    appearance: "primary",
  });
  const [tempfiles, setTempFiles] = useState<ITempFile[]>([]);

  const handleSelectDocuments = async (fileList: FileList) => {
    const files = [...fileList];

    const tempFilesIndex = tempfiles.length;

    const filesLoading = files.map((file, ix) => ({
      id: `${requirementDocument.requirementId}-${tempFilesIndex + (ix + 1)}`,
      file,
      requirementId: requirementDocument.requirementId,
      documentType: requirementDocument.documentType,
      label: requirementDocument.label,
      documentTypeDescription: requirementDocument.documentTypeDescription,
      profile: requirementDocument.profile,
      evaluationDescription: requirementDocument.evaluationDescription,
      responseCode: requirementDocument.responseCode,
      loading: true,
    }));

    setTempFiles([...tempfiles, ...filesLoading]);

    const newTempFiles = [...tempfiles];

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

      const documentRequest: ISaveDocumentRequest = {
        documentType: requirementDocument.documentType || "",
        identificationNumber: user.identification,
        file: files[ix],
      };

      if (!accessToken) return;

      const id = `${requirementDocument.requirementId}-${tempFilesIndex + (ix + 1)}`;

      try {
        const documentResponse = await saveDocument(
          documentRequest,
          accessToken,
        );

        newTempFiles.push({
          id,
          documentType: documentResponse?.documentType,
          sequence: documentResponse?.sequence,
          loading: false,
          file: files[ix],
          requirementId: requirementDocument.requirementId,
          label: requirementDocument.label,
          documentTypeDescription: requirementDocument.documentTypeDescription,
          profile: requirementDocument.profile,
          evaluationDescription: requirementDocument.evaluationDescription,
          responseCode: requirementDocument.responseCode,
        });

        setMessage({
          show: false,
          title: "",
          description: "",
          icon: <></>,
          appearance: "primary",
        });
      } catch (error) {
        captureNewError(
          error,
          {
            inFunction: "handleSelectDocuments",
            action: "saveDocument",
            screen: "AttachDocumentModal",
            file: "src/components/modals/general/AttachDocumentModal/index.tsx",
          },
          { feature: mapRequestErrorToTag(requestType) },
        );
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

    setTempFiles(newTempFiles);
  };

  const handleRemoveDocument = (delFile: ITempFile) => {
    setTempFiles(tempfiles.filter((file) => file.id !== delFile.id));

    if (!accessToken || !delFile.documentType || !delFile.sequence) return;

    removeDocument(
      {
        documentType: delFile.documentType,
        sequence: delFile.sequence,
        customerCode: user.identification,
      },
      accessToken,
    ).catch((error) => {
      captureNewError(
        error,
        {
          inFunction: "handleRemoveDocument",
          action: "removeDocument",
          screen: "AttachDocumentModal",
          file: "src/components/modals/general/AttachDocumentModal/index.tsx",
        },
        { feature: mapRequestErrorToTag(requestType) },
      );
    });
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
          <FileDrop onSelectFiles={handleSelectDocuments} multiple />

          <Text type="body" size="medium" appearance="gray">
            Peso máximo por archivo: {maxFileSize}MB
          </Text>
        </Stack>

        {message.show ? (
          <Stack>
            <Message title={message.title} appearance="danger" fullwidth />
          </Stack>
        ) : (
          tempfiles.length > 0 && (
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium">
                Documentos adjuntos
              </Text>

              <Stack direction="column" gap={inube.spacing.s200}>
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
              </Stack>

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
