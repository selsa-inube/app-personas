import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Divider,
  Fieldset,
  Grid,
  Icon,
  Select,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IFamilyGroupEntries } from "@pages/general/UpdateData/forms/FamilyGroupForm/types";
import { FormikProps } from "formik";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { educationLevelTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/educationLeveldm";
import { StyledModal, StyledScrollbar } from "./styles";

interface FamilyMemberViewModalProps {
  portalId: string;
  formik: FormikProps<IFamilyGroupEntries>;
  onCloseModal: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function FamilyMemberViewModal(props: FamilyMemberViewModalProps) {
  const { portalId, formik, onCloseModal, onEdit, onDelete } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $isMobile={isMobile} $isTablet={isTablet}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Ver familiar
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              size="20px"
              spacing="narrow"
              cursorHover
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Detalles de la información
          </Text>
        </Stack>
        <StyledScrollbar $isMobile={isMobile}>
          <Divider dashed />
          <Fieldset
            legend="Identificación"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Grid
              gap={inube.spacing.s200}
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              width="100%"
            >
              <Select
                label="Tipo de documento"
                placeholder=""
                name="type"
                id="type"
                options={identificationTypeDM.options}
                size="compact"
                fullwidth
                value={formik.values.type?.id || ""}
                onChange={() => true}
                readonly
              />
              <TextField
                label="Identificación"
                name="identificationNumber"
                id="identificationNumber"
                placeholder=""
                value={formik.values.identificationNumber}
                type="number"
                size="compact"
                fullwidth
                readonly
              />
              <TextField
                label="Primer nombre"
                name="firstName"
                id="firstName"
                placeholder=""
                value={formik.values.firstName}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
              <TextField
                label="Segundo nombre"
                name="secondName"
                id="secondName"
                placeholder=""
                value={formik.values.secondName || ""}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
              <TextField
                label="Primer apellido"
                name="firstLastName"
                id="firstLastName"
                placeholder=""
                value={formik.values.firstLastName}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
              <TextField
                label="Segundo apellido"
                name="secondLastName"
                id="secondLastName"
                placeholder=""
                value={formik.values.secondLastName || ""}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
            </Grid>
          </Fieldset>
          <Fieldset
            legend="Contacto"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Grid
              gap={inube.spacing.s200}
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              width="100%"
            >
              <TextField
                label="Celular"
                name="cellPhone"
                id="cellPhone"
                placeholder=""
                value={formik.values.cellPhone}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
              <TextField
                label="Correo eléctronico"
                name="email"
                id="email"
                placeholder=""
                value={formik.values.email}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
            </Grid>
          </Fieldset>
          <Fieldset
            legend="Información"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Grid
              gap={inube.spacing.s200}
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              width="100%"
            >
              <Select
                label="Parentesco"
                placeholder=""
                name="relationship"
                id="relationship"
                size="compact"
                options={relationshipDM.options}
                fullwidth
                value={formik.values.relationship || ""}
                onChange={() => true}
                readonly
              />
              <Select
                label="Depende económicamente"
                placeholder=""
                name="isDependent"
                id="isDependent"
                size="compact"
                options={activeDM.options}
                fullwidth
                value={formik.values.isDependent || ""}
                onChange={() => true}
                readonly
              />
              <Select
                label="Nivel de escolaridad"
                placeholder=""
                name="educationLevel"
                id="educationLevel"
                options={educationLevelTypeDM.options}
                size="compact"
                fullwidth
                value={formik.values.educationLevel || ""}
                onChange={() => true}
                readonly
              />
              <Select
                label="Profesión"
                placeholder=""
                name="profession"
                id="profession"
                size="compact"
                options={getDomainById("profession")}
                onChange={() => true}
                fullwidth
                value={formik.values.profession || ""}
                readonly
              />
              <Select
                label="Genero"
                placeholder=""
                name="gender"
                id="gender"
                size="compact"
                options={genderDM.options}
                fullwidth
                value={formik.values.gender || ""}
                onChange={() => true}
                disabled
              />
              <TextField
                label="Fecha de nacimiento"
                name="birthDate"
                id="birthDate"
                placeholder=""
                value={formik.values.birthDate}
                type="text"
                size="compact"
                fullwidth
                readonly
              />
              <Select
                label="Actividad económica"
                placeholder=""
                name="businessActivity"
                id="businessActivity"
                options={getDomainById("economicSector")}
                size="compact"
                fullwidth
                value={formik.values.businessActivity || ""}
                onChange={() => true}
                readonly
              />
            </Grid>
          </Fieldset>
        </StyledScrollbar>
        <Stack gap={inube.spacing.s150}>
          <Button
            appearance="danger"
            variant="outlined"
            spacing="compact"
            onClick={onDelete}
          >
            Eliminar
          </Button>
          <Button appearance="primary" spacing="compact" onClick={onEdit}>
            Editar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { FamilyMemberViewModal };
