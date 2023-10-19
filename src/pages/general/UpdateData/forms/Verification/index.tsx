import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { updateDataSteps } from "../../config/assisted";
import { IFormsUpdateData } from "../../types";
import { IContactDataEntry } from "../ContactDataForm/types";
import { IPersonalInformationEntry } from "../PersonalInformationForm/types";

const renderPersonalInfoVerification = (
  values: IPersonalInformationEntry,
  handleStepChange: (stepId: number) => void,
  isTablet: boolean
) => (
  <Accordion title="Información personal">
    <Stack
      direction="column"
      width="100%"
      alignItems="flex-end"
      gap={isTablet ? "s150" : "s200"}
    >
      <Grid
        templateColumns={isTablet ? "1fr" : "1fr 1fr"}
        gap="s100"
        width="100%"
      >
        <BoxAttribute label="Primer nombre" value={values.firstName} />
        <BoxAttribute label="Segundo nombre" value={values.secondName} />
        <BoxAttribute label="Primer apellido" value={values.firstLastName} />
        <BoxAttribute label="Segundo apellido" value={values.secondLastName} />
        <BoxAttribute
          label="Tipo de identificación"
          value={identificationTypeDM.valueOf(values.identificationType)?.value}
        />
        <BoxAttribute
          label="Numero de identificación"
          value={values.identification}
        />
        <BoxAttribute
          label="Lugar de expedición"
          value={cityDM.valueOf(values.expeditionPlace)?.value}
        />
        <BoxAttribute
          label="Fecha de expedición"
          value={values.expeditionDate}
        />
        <BoxAttribute label="Fecha de nacimiento" value={values.birthDate} />
        <BoxAttribute
          label="Ciudad de nacimiento"
          value={cityDM.valueOf(values.city)?.value}
        />
        <BoxAttribute
          label="Genero"
          value={genderDM.valueOf(values.gender)?.value}
        />
        <BoxAttribute
          label="Estado civil"
          value={maritalStatusDM.valueOf(values.maritalStatus)?.value}
        />
        <BoxAttribute
          label="Factor RH"
          value={bloodTypeDM.valueOf(values.bloodType)?.value}
        />
      </Grid>

      <Button
        iconBefore={<MdOutlineArrowBack />}
        handleClick={() =>
          handleStepChange(updateDataSteps.personalInformation.id)
        }
        variant="none"
        appearance="dark"
      >
        Regresar a este paso
      </Button>
    </Stack>
  </Accordion>
);

const renderContacDataVerification = (
  values: IContactDataEntry,
  handleStepChange: (stepId: number) => void,
  isTablet: boolean
) => (
  <Accordion title="Datos de contacto">
    <Stack
      direction="column"
      width="100%"
      alignItems="flex-end"
      gap={isTablet ? "s150" : "s200"}
    >
      <Grid
        templateColumns={isTablet ? "1fr" : "1fr 1fr"}
        gap="s100"
        width="100%"
      >
        <BoxAttribute label="País" value={values.country} />
        <BoxAttribute
          label="Estado / Departamento"
          value={values.stateOrDepartment}
        />
        <BoxAttribute
          label="Ciudad"
          value={cityDM.valueOf(values.city)?.value}
        />
        <BoxAttribute label="Dirección" value={values.address} />
        <BoxAttribute label="Código postal" value={values.postalCode} />
        <BoxAttribute label="Teléfono" value={values.landlinePhone} />
        <BoxAttribute label="Celular" value={values.cellPhone} />
        <BoxAttribute label="Correo" value={values.email} />
      </Grid>

      <Button
        iconBefore={<MdOutlineArrowBack />}
        handleClick={() => handleStepChange(updateDataSteps.contactData.id)}
        variant="none"
        appearance="dark"
      >
        Regresar a este paso
      </Button>
    </Stack>
  </Accordion>
);

interface VerificationProps {
  updatedData: IFormsUpdateData;
  handleStepChange: (stepId: number) => void;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap="s300">
      {renderPersonalInfoVerification(
        updatedData.personalInformation.values,
        handleStepChange,
        isTablet
      )}
      {renderContacDataVerification(
        updatedData.contactData.values,
        handleStepChange,
        isTablet
      )}
    </Stack>
  );
}

export { UpdateDataVerification };
