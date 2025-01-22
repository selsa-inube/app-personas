import { FileCard } from "@components/cards/FileCard";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RequestReceivedModal } from "@components/modals/saving/RequestReceivedModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Textarea } from "@design/input/Textarea";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Grid, Icon, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdArrowBack, MdInfoOutline } from "react-icons/md";
import { getFieldState } from "src/utils/forms/forms";
import { crumbsCreatePQRS } from "./config/navigation";
import { StyledCard } from "./styles";
import { ICreatePQRSEntry, ISelectedDocument } from "./types";

interface CreatePQRSUIProps {
  formik: FormikProps<ICreatePQRSEntry>;
  maxFileSize: number;
  loadingSend: boolean;
  typeOptions: ISelectOption[];
  reasonOptions: ISelectOption[];
  attentionPointsOptions: ISelectOption[];
  redirectModal: boolean;
  sectionMessage: string;
  pqrsType: string;
  attachModal: {
    show: boolean;
    requirementId: string;
    documentType: string;
  };
  onSelectDocument: (document: ISelectedDocument) => void;
  onOpenAttachModal: (requirementId: string, documentType: string) => void;
  onCloseAttachModal: () => void;
  onRemoveDocument: (id: string) => void;
  onAttachButtonClick: () => void;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
}

function CreatePQRSUI(props: CreatePQRSUIProps) {
  const {
    formik,
    maxFileSize,
    loadingSend,
    attachModal,
    typeOptions,
    reasonOptions,
    redirectModal,
    sectionMessage,
    pqrsType,
    attentionPointsOptions,
    onSelectDocument,
    onCloseAttachModal,
    onRemoveDocument,
    onAttachButtonClick,
    onRedirectToHome,
    onRedirectToRequests,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s600}>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Breadcrumbs crumbs={crumbsCreatePQRS} />
          <Title
            title="Crear PQRS"
            subtitle="Realiza la radicación de tus peticiones, quejas, reclamos y sugerencias."
            icon={<MdArrowBack />}
            navigatePage="/my-pqrs"
          />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s400}>
          <StyledCard>
            <Icon appearance="help" icon={<MdInfoOutline />} />
            <Text
              type="label"
              size={isMobile ? "medium" : "large"}
              weight="bold"
            >
              {sectionMessage}
            </Text>
          </StyledCard>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            <Select
              id="type"
              name="type"
              label="Tipo"
              size="compact"
              placeholder="Selecciona una de las opciones"
              value={formik.values.type || ""}
              options={typeOptions}
              onChange={formik.handleChange}
              isFullWidth
              isRequired
            />
            <Select
              id="motive"
              name="motive"
              label="Motivo"
              size="compact"
              placeholder={
                formik.values.type === ""
                  ? ""
                  : "Selecciona una de las opciones"
              }
              value={formik.values.motive || ""}
              options={reasonOptions}
              onChange={formik.handleChange}
              isDisabled={formik.values.type === ""}
              isFullWidth
              isRequired
            />
            <Select
              id="attentionPlace"
              name="attentionPlace"
              label="Punto de atención"
              size="compact"
              placeholder={
                formik.values.motive === ""
                  ? ""
                  : "Selecciona una de las opciones"
              }
              value={formik.values.attentionPlace || ""}
              options={attentionPointsOptions}
              onChange={formik.handleChange}
              isDisabled={formik.values.motive === ""}
              isFullWidth
              isRequired
            />
          </Grid>
          <Textarea
            label="Descripción"
            name="description"
            id="description"
            placeholder="Realiza una descripción de tu solicitud."
            value={formik.values.description || ""}
            errorMessage={formik.errors.description}
            isFullWidth
            maxLength={150}
            withCounter
            state={getFieldState(formik, "description")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage=""
            isRequired
          />
        </Stack>
        <Accordion
          title="Documentos adjuntos"
          defaultOpen
          withButton
          buttonText="Adjuntar"
          onClickButton={onAttachButtonClick}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            gap={inube.spacing.s200}
            width="100%"
          >
            {formik.values.documents &&
              formik.values.documents.map((file) => (
                <FileCard
                  key={file.id}
                  id={file.id}
                  name={file.file.name}
                  size={file.file.size}
                  onRemove={() => onRemoveDocument(file.id)}
                />
              ))}
          </Grid>
        </Accordion>
        <Stack justifyContent="flex-end">
          <Button
            spacing="compact"
            onClick={formik.submitForm}
            disabled={!formik.isValid || !formik.dirty || loadingSend}
          >
            Enviar
          </Button>
        </Stack>
      </Stack>

      {attachModal.show && (
        <AttachDocumentModal
          portalId="modals"
          maxFileSize={maxFileSize}
          documentType={attachModal.documentType}
          requirementId={attachModal.requirementId}
          onSelectDocuments={(files) => onSelectDocument(files[0])}
          onCloseModal={onCloseAttachModal}
        />
      )}

      {loadingSend && (
        <LoadingModal
          title="Creando PQRS..."
          message="Espera unos segundos, estamos procesando la PQRS."
        />
      )}

      {redirectModal && (
        <RequestReceivedModal
          portalId="modals"
          typeRequest={pqrsType}
          onRedirectToHome={onRedirectToHome}
          onRedirectToRequests={onRedirectToRequests}
        />
      )}
    </>
  );
}

export { CreatePQRSUI };
