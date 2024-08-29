import { InfoCard } from "@components/cards/InfoCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { InfoModal } from "@components/modals/general/InfoModal";
import { Button } from "@design/input/Button";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import {
  MdDeleteOutline,
  MdInfoOutline,
  MdOutlineDescription,
  MdQuestionMark,
} from "react-icons/md";
import { ISelectedDocument } from "src/model/entity/service";
import { truncateFileName } from "src/utils/texts";
import { IDocumentaryRequirementsEntry } from "./types";

function renderRequirement(
  label: string,
  id: string,
  documentType: string,
  selectedDocuments: ISelectedDocument[],
  onAttachDocument: (id: string, documentType: string) => void,
  onRemove: (id: string) => void,
) {
  const selectedFile = selectedDocuments.find((doc) => doc.id === id);

  return (
    <OutlineCard key={id}>
      <Stack
        padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
        direction="column"
        gap={inube.spacing.s150}
        width="100%"
      >
        <Stack
          justifyContent="space-between"
          alignItems="center"
          height="fit-content"
        >
          <Text type="label" size="large">
            {label}
          </Text>

          <Button
            variant="none"
            onClick={() => onAttachDocument(id, documentType)}
            disabled={!!selectedFile}
          >
            Adjuntar
          </Button>
        </Stack>

        {selectedFile && (
          <>
            <Divider dashed />
            <Stack gap={inube.spacing.s150} alignItems="center" width="100%">
              <Icon
                icon={<MdOutlineDescription />}
                appearance="dark"
                size="24px"
                spacing="narrow"
                cursorHover
              />

              <Stack
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Stack direction="column" gap={inube.spacing.s050} width="100%">
                  <Text type="label" size="medium">
                    {truncateFileName(selectedFile.file.name, 20)}
                  </Text>

                  <Text type="body" size="small" appearance="gray">
                    {(selectedFile.file.size / 1024).toFixed(2)} KB
                  </Text>
                </Stack>

                <Icon
                  icon={<MdDeleteOutline />}
                  appearance="danger"
                  size="20px"
                  spacing="narrow"
                  cursorHover
                  onClick={() => onRemove(id)}
                />
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </OutlineCard>
  );
}

interface DocumentaryRequirementsFormUIProps {
  formik: FormikProps<IDocumentaryRequirementsEntry>;
  showInfoModal: boolean;
  maxFileSize: number;
  attachModal: {
    show: boolean;
    id: string;
    documentType: string;
  };
  onSelectDocument: (file: File, id: string) => void;
  onRemoveDocument: (id: string) => void;
  onToggleInfoModal: () => void;
  onOpenAttachModal: (id: string, documentType: string) => void;
  onCloseAttachModal: () => void;
}

function DocumentaryRequirementsFormUI(
  props: DocumentaryRequirementsFormUIProps,
) {
  const {
    formik,
    showInfoModal,
    maxFileSize,
    attachModal,
    onSelectDocument,
    onRemoveDocument,
    onToggleInfoModal,
    onOpenAttachModal,
    onCloseAttachModal,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  if (formik.values.requiredDocuments.length === 0) {
    return (
      <Stack>
        <InfoCard
          title="Requisitos documentales"
          description="Actualmente, te encuentras utilizando un software externo para cargar los requisitos documentales. Luego de crear la solicitud, podrás adjuntar tus documentos."
          appearance="help"
          icon={<MdInfoOutline />}
        />
      </Stack>
    );
  }

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s400}>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Stack gap={inube.spacing.s200} alignItems="center">
            <Text type="title" size="medium">
              Requisitos documentales
            </Text>
            <Icon
              icon={<MdQuestionMark />}
              appearance="help"
              spacing="narrow"
              size="16px"
              variant="filled"
              shape="circle"
              cursorHover
              onClick={onToggleInfoModal}
            />
          </Stack>

          <Grid
            templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            {formik.values.requiredDocuments.map((document) =>
              renderRequirement(
                document.label,
                document.id,
                document.documentType || "113",
                formik.values.selectedDocuments,
                onOpenAttachModal,
                onRemoveDocument,
              ),
            )}
          </Grid>
        </Stack>
      </Stack>

      {showInfoModal && (
        <InfoModal
          title="Requisitos documentales"
          description="Uno de nuestros analistas revisara la documentación para confirmar que se encuentre completa."
          buttonText="Aceptar"
          portalId="modals"
          onCloseModal={onToggleInfoModal}
        />
      )}

      {attachModal.show && (
        <AttachDocumentModal
          portalId="modals"
          maxFileSize={maxFileSize}
          documentType={attachModal.documentType}
          onSelectDocuments={(files) =>
            onSelectDocument(files[0], attachModal.id)
          }
          onCloseModal={onCloseAttachModal}
        />
      )}
    </>
  );
}

export { DocumentaryRequirementsFormUI };
