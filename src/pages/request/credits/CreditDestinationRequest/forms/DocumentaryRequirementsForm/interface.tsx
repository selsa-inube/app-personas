import { FileCard } from "@components/cards/FileCard";
import { InfoCard } from "@components/cards/InfoCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { InfoModal } from "@components/modals/general/InfoModal";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { FileDrop } from "@design/input/FileDrop";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IMessage } from "@ptypes/messages.types";
import { FormikProps } from "formik";
import { MdHelpOutline, MdQuestionMark } from "react-icons/md";
import { IDocumentaryRequirementsEntry } from "./types";

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
  maxFileSize: number;
  message: IMessage;
  onSelectDocuments: (files: FileList) => void;
  onRemoveDocument: (id: string) => void;
  onToggleInfoModal: () => void;
  onCloseMessage: () => void;
}

function DocumentaryRequirementsFormUI(
  props: DocumentaryRequirementsFormUIProps,
) {
  const {
    formik,
    showInfoModal,
    maxFileSize,
    message,
    onSelectDocuments,
    onRemoveDocument,
    onToggleInfoModal,
    onCloseMessage,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 580px)");

  if (!formik.values.withDocumentaryRequirements) {
    return (
      <Stack>
        <InfoCard
          title="Requisitos documentales"
          description="Actualmente, te encuentras utilizando un software externo para cargar los requisitos documentales. Luego de crear la solicitud, podrás adjuntar tus documentos."
          appearance="help"
          icon={<MdHelpOutline />}
        />
      </Stack>
    );
  }

  return (
    <>
      <Stack direction="column" gap="s400">
        <Stack direction="column" gap="s300">
          <Stack gap="s200" alignItems="center">
            <Text type="title" size="medium">
              Requisitos documentales
            </Text>
            <Icon
              icon={<MdQuestionMark />}
              appearance="help"
              spacing="none"
              size="16px"
              variant="filled"
              shape="circle"
              cursorHover
              onClick={onToggleInfoModal}
            />
          </Stack>

          <Grid templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`} gap="s200">
            {formik.values.requiredDocuments.map((document) =>
              renderRequirement(document.label, document.id),
            )}
          </Grid>
        </Stack>

        <Stack direction="column" gap="s300">
          <Text type="title" size="medium">
            Adjuntar documentos
          </Text>

          <Stack direction="column" gap="s150">
            <FileDrop onSelectFiles={onSelectDocuments} />

            <Text type="body" size="medium" appearance="gray">
              Peso máximo por archivo: {maxFileSize}MB
            </Text>
          </Stack>
        </Stack>

        {formik.values.selectedDocuments.length > 0 && (
          <Stack direction="column" gap="s300">
            <Text type="title" size="medium">
              Documentos adjuntos
            </Text>

            <Grid
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              gap="s200"
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

      {message.show && (
        <SectionMessage
          title={message.title}
          description={message.description}
          appearance={message.appearance}
          icon={message.icon}
          onClose={onCloseMessage}
          duration={5000}
        />
      )}
    </>
  );
}

export { DocumentaryRequirementsFormUI };
