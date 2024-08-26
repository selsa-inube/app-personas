import { FileCard } from "@components/cards/FileCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { InfoModal } from "@components/modals/general/InfoModal";
import { FileDrop } from "@design/input/FileDrop";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { MdQuestionMark } from "react-icons/md";
import { IDocumentaryRequirementsEntry } from "./types";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

function renderRequirement(label: string, id: string) {
  return (
    <OutlineCard key={id}>
      <Stack padding={`${inube.spacing.s100} ${inube.spacing.s250}`}>
        <Text type="body" size="medium">
          {label}
        </Text>
      </Stack>
    </OutlineCard>
  );
}

interface DocumentaryRequirementsFormUIProps {
  formik: FormikProps<IDocumentaryRequirementsEntry>;
  showInfoModal: boolean;
  onSelectDocuments: (files: FileList) => void;
  onRemoveDocument: (id: string) => void;
  onToggleInfoModal: () => void;
}

function DocumentaryRequirementsFormUI(
  props: DocumentaryRequirementsFormUIProps,
) {
  const {
    formik,
    showInfoModal,
    onSelectDocuments,
    onRemoveDocument,
    onToggleInfoModal,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 580px)");

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
              renderRequirement(document.label, document.id),
            )}
          </Grid>
        </Stack>

        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="title" size="medium">
            Adjuntar documentos
          </Text>

          <FileDrop onSelectFiles={onSelectDocuments} />
        </Stack>

        {formik.values.selectedDocuments.length > 0 && (
          <Stack direction="column" gap={inube.spacing.s300}>
            <Text type="title" size="medium">
              Documentos adjuntos
            </Text>

            <Grid
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              gap={inube.spacing.s200}
            >
              {formik.values.selectedDocuments.map((document) => (
                <FileCard
                  id={document.name}
                  key={document.name}
                  name={document.name}
                  onRemove={onRemoveDocument}
                  size={document.size}
                />
              ))}
            </Grid>
          </Stack>
        )}
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
    </>
  );
}

export { DocumentaryRequirementsFormUI };
