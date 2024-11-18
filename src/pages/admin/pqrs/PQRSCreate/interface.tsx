import { Title } from "@design/data/Title";
import { Accordion } from "@design/data/Accordion";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { inube } from "@design/tokens";
import { StyledCard } from "./styles";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { MdArrowBack, MdInfoOutline } from "react-icons/md";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { FileCard } from "@components/cards/FileCard";
import { getFieldState } from "src/utils/forms/forms";
import { FormikProps } from "formik";
import { pqrsTypeDM } from "src/model/domains/pqrs/pqrsTypeDM";
import { pqrsMotiveDM } from "src/model/domains/pqrs/pqrsMotiveDM";
import { pqrsAttentionPlaceDM } from "src/model/domains/pqrs/pqrsAttentionPlaceDM";
import { crumbsCreatePQRS } from "./config/navigation";
import { ICreatePQRSEntry, ISelectedDocument } from "./types";
import { useMediaQuery } from "@hooks/useMediaQuery";

interface CreatePQRSUIProps {
  formik: FormikProps<ICreatePQRSEntry>;
  maxFileSize: number;
  loadingSend: boolean;
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
}

function CreatePQRSUI(props: CreatePQRSUIProps) {
  const {
    formik,
    maxFileSize,
    loadingSend,
    attachModal,
    onSelectDocument,
    onCloseAttachModal,
    onRemoveDocument,
    onAttachButtonClick,
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
              Estimado usuario, para Sistemas En Línea es importante tu opinión,
              resolver tus dudas, atender tus quejas y reconocimientos a través
              de este espacio. Te informamos que de acuerdo con el estatuto de
              Sistemas En Línea Articulo 99. Trámite de quejas y reclamos, un
              término de hasta 15 días hábiles te daremos respuesta a tus PQRS.
            </Text>
          </StyledCard>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            <Select
              id="type"
              name="type"
              label="Tipo"
              size="compact"
              placeholder="Selecciona una  de las opciones"
              value={formik.values.type || ""}
              options={pqrsTypeDM.options}
              onChange={formik.handleChange}
              state={getFieldState(formik, "type")}
              isFullWidth
              isRequired
            />
            <Select
              id="motive"
              name="motive"
              label="Motivo"
              size="compact"
              placeholder="Selecciona una  de las opciones"
              value={formik.values.motive || ""}
              options={pqrsMotiveDM.options}
              onChange={formik.handleChange}
              state={getFieldState(formik, "motive")}
              isDisabled={formik.values.type === ""}
              isFullWidth
              isRequired
            />
            <Select
              id="attentionPlace"
              name="attentionPlace"
              label="Punto de atención"
              size="compact"
              placeholder="Selecciona una  de las opciones"
              value={formik.values.attentionPlace || ""}
              options={pqrsAttentionPlaceDM.options}
              onChange={formik.handleChange}
              state={getFieldState(formik, "attentionPlace")}
              isDisabled={formik.values.motive === ""}
              isFullWidth
              isRequired
            />
            <TextField
              label="Correo electrónico"
              name="email"
              id="email"
              placeholder="Digita tu correo electrónico"
              type="text"
              size="compact"
              value={formik.values.email || ""}
              errorMessage={formik.errors.email}
              state={getFieldState(formik, "email")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El correo electrónico es válido"
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
            templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
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
    </>
  );
}

export { CreatePQRSUI };
