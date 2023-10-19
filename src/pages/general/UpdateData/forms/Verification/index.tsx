import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { MdOutlineArrowBack } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { educationLevelTypeDM } from "src/model/domains/socioeconomicInformation/educationLeveldm";
import { updateDataSteps } from "../../config/assisted";
import { IFormsUpdateData } from "../../types";
import { IBankTransfersEntry } from "../BankTransfersForm/types";
import { IPersonalInformationEntry } from "../PersonalInformationForm/types";
import { ISocioeconomicInformationEntry } from "../SocioeconomicInformationForm/types";
import { updateDataBoxTitles } from "./config/box";

const renderPersonalInfoVerification = (
  values: IPersonalInformationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute label="Primer nombre:" value={values.firstName} />
    <BoxAttribute label="Segundo nombre:" value={values.secondName} />
    <BoxAttribute label="Primer apellido:" value={values.firstLastName} />
    <BoxAttribute label="Segundo apellido:" value={values.secondLastName} />
    <BoxAttribute
      label="Tipo de identificación:"
      value={identificationTypeDM.valueOf(values.identificationType)?.value}
    />
    <BoxAttribute
      label="Numero de identificación:"
      value={values.identification}
    />
    <BoxAttribute
      label="Lugar de expedición:"
      value={cityDM.valueOf(values.expeditionPlace)?.value}
    />
    <BoxAttribute label="Fecha de expedición:" value={values.expeditionDate} />
    <BoxAttribute label="Fecha de nacimiento:" value={values.birthDate} />
    <BoxAttribute
      label="Ciudad de nacimiento:"
      value={cityDM.valueOf(values.city)?.value}
    />
    <BoxAttribute
      label="Genero:"
      value={genderDM.valueOf(values.gender)?.value}
    />
    <BoxAttribute
      label="Estado civil:"
      value={maritalStatusDM.valueOf(values.maritalStatus)?.value}
    />
    <BoxAttribute
      label="Factor RH:"
      value={bloodTypeDM.valueOf(values.bloodType)?.value}
    />
  </Grid>
);

const renderBankTransfersVerification = (
  values: IBankTransfersEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute
      label="Entidad bancaria:"
      value={getValueOfDomain(values.bankingEntity, "bank")?.value}
    />
    <BoxAttribute
      label="Tipo de cuenta:"
      value={getValueOfDomain(values.accountType, "accountType")?.value}
    />
    <BoxAttribute label="Numero de cuenta:" value={values.accountNumber} />
  </Grid>
);

const renderSocioeconomicInfoVerification = (
  values: ISocioeconomicInformationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.educationLevel !== "" && (
      <BoxAttribute
        label="Nivel de estudios:"
        value={educationLevelTypeDM.valueOf(values.educationLevel)?.value}
      />
    )}

    {values.isResponsibleHome !== "" && (
      <BoxAttribute
        label="Responsable del hogar:"
        value={activeDM.valueOf(values.isResponsibleHome)?.value}
      />
    )}

    {values.isSingleMother !== "" && (
      <BoxAttribute
        label="Mujer cabeza de familia:"
        value={activeDM.valueOf(values.isSingleMother)?.value}
      />
    )}

    <BoxAttribute
      label="Numero de personas a cargo:"
      value={values.dependants}
    />

    {values.isPublicExposed !== "" && (
      <BoxAttribute
        label="Públicamente expuesto:"
        value={activeDM.valueOf(values.isPublicExposed)?.value}
      />
    )}

    {values.isDeclaredIncome !== "" && (
      <BoxAttribute
        label="Declara renta:"
        value={activeDM.valueOf(values.isDeclaredIncome)?.value}
      />
    )}

    {values.isPublicOfficials !== "" && (
      <BoxAttribute
        label="Administra recursos publicos:"
        value={activeDM.valueOf(values.isPublicOfficials)?.value}
      />
    )}
  </Grid>
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
      {Object.entries(updateDataBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "s150" : "s200"}
          >
            {key === "personalInformation" &&
              renderPersonalInfoVerification(
                updatedData.personalInformation.values,
                isTablet
              )}
            {key === "bankTransfers" &&
              renderBankTransfersVerification(
                updatedData.bankTransfers.values,
                isTablet
              )}
            {key === "socioeconomicInformation" &&
              renderSocioeconomicInfoVerification(
                updatedData.socioeconomicInformation.values,
                isTablet
              )}
            <Button
              iconBefore={<MdOutlineArrowBack />}
              handleClick={() =>
                handleStepChange(
                  updateDataSteps[key as keyof IFormsUpdateData].id
                )
              }
              variant="none"
              appearance="dark"
            >
              Regresar a este paso
            </Button>
          </Stack>
        </Accordion>
      ))}
    </Stack>
  );
}

export { UpdateDataVerification };
