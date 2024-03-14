import { TextField } from "@design/input/TextField";
import { IPersonalDataEntry } from "../../PersonalDataForm/types";
import { Select } from "@design/input/Select";
import { formatPrimaryDate } from "src/utils/dates";
import { IContactDataEntry } from "../../ContactDataForm/types";
import { IFormsCreateFamilyMember } from "../../../types";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";
import { activeDM } from "src/model/domains/general/activedm";
import { educationLevelTypeDM } from "src/model/domains/socioeconomicInformation/educationLeveldm";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { IInformationDataEntry } from "../../InformationDataForm/types";

const renderIdentificationDataInfoVerification = (
  values: IPersonalDataEntry,
) => (
  <>
    {values.identificationNumber && (
      <TextField
        label="Documento"
        placeholder="Documento"
        name="identificationNumber"
        id="identificationNumber"
        type="number"
        size="compact"
        value={values.identificationNumber}
        isFullWidth
        readOnly
      />
    )}
    {values.type && (
      <Select
        label="Tipo de documento"
        placeholder="Tipo de documento"
        name="type"
        id="type"
        size="compact"
        options={identificationTypeDM.options}
        value={values.type}
        isFullWidth
        readOnly
      />
    )}
    {values.firstName && (
      <TextField
        label="Primer nombre"
        placeholder="Primer nombre"
        name="firstName"
        id="firstName"
        type="text"
        size="compact"
        value={values.firstName}
        isFullWidth
        readOnly
      />
    )}
    {values.secondName && (
      <TextField
        label="Segundo nombre"
        placeholder="Segundo nombre"
        name="secondName"
        id="secondName"
        type="text"
        size="compact"
        value={values.secondName}
        isFullWidth
        readOnly
      />
    )}
    {values.firstLastName && (
      <TextField
        label="Primer apellido"
        placeholder="Primer apellido"
        name="firstLastName"
        id="firstLastName"
        type="text"
        size="compact"
        value={values.firstLastName}
        isFullWidth
        readOnly
      />
    )}
    {values.secondLastName && (
      <TextField
        label="Segundo apellido"
        placeholder="Segundo apellido"
        name="secondLastName"
        id="secondLastName"
        type="text"
        size="compact"
        value={values.secondLastName}
        isFullWidth
        readOnly
      />
    )}
  </>
);

const renderContactDataInfoVerification = (values: IContactDataEntry) => (
  <>
    {values.cellPhone && (
      <TextField
        label="Celular"
        placeholder="Celular"
        name="cellPhone"
        id="cellPhone"
        type="number"
        size="compact"
        value={values.cellPhone}
        isFullWidth
        readOnly
      />
    )}
    {values.email && (
      <TextField
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        id="email"
        type="text"
        size="compact"
        value={values.email}
        isFullWidth
        readOnly
      />
    )}
  </>
);

const renderInformationDataInfoVerification = (
  informationValues: IInformationDataEntry,
  personalValues: IPersonalDataEntry,
) => (
  <>
    {(personalValues.relationship || informationValues.relationship) && (
      <Select
        label="Parentesco"
        placeholder="Parentesco"
        name="relationship"
        id="relationship"
        size="compact"
        options={relationshipDM.options}
        value={informationValues.relationship ?? personalValues.relationship}
        isFullWidth
        readOnly
      />
    )}
    {(personalValues.isDependent || informationValues.isDependent) && (
      <Select
        label="Depende económicamente"
        placeholder="Depende económicamente"
        name="isDependent"
        id="isDependent"
        size="compact"
        options={activeDM.options}
        value={informationValues.isDependent ?? personalValues.isDependent}
        isFullWidth
        readOnly
      />
    )}
    {informationValues.educationLevel && (
      <Select
        label="Nivel de escolaridad"
        placeholder="Nivel de escolaridad"
        name="educationLevel"
        id="educationLevel"
        size="compact"
        options={educationLevelTypeDM.options}
        value={informationValues.educationLevel}
        isFullWidth
        readOnly
      />
    )}
    {informationValues.profession && (
      <Select
        label="Profesión"
        placeholder="Profesión"
        name="profession"
        id="profession"
        size="compact"
        options={getDomainById("profession")}
        value={informationValues.profession}
        isFullWidth
        readOnly
      />
    )}
    {informationValues.gender && (
      <Select
        label="Genero"
        placeholder="Genero"
        name="gender"
        id="gender"
        size="compact"
        options={genderDM.options}
        value={informationValues.gender}
        isFullWidth
        readOnly
      />
    )}
    {informationValues.birthDate && (
      <TextField
        label="Fecha de nacimiento"
        placeholder="Fecha de nacimiento"
        name="birthDate"
        id="birthDate"
        type="text"
        size="compact"
        value={formatPrimaryDate(new Date(informationValues.birthDate))}
        isFullWidth
        readOnly
      />
    )}
    {informationValues.businessActivity && (
      <Select
        label="Actividad económica"
        placeholder="Actividad económica"
        name="businessActivity"
        id="businessActivity"
        size="compact"
        options={getDomainById("economicSector")}
        value={informationValues.businessActivity}
        isFullWidth
        readOnly
      />
    )}
  </>
);

interface VerificationFieldsetsProps {
  updatedData: IFormsCreateFamilyMember;
  stepKey: string;
}

function VerificationFieldsets(props: VerificationFieldsetsProps) {
  const { updatedData, stepKey } = props;
  return (
    <>
      {stepKey === "personalData" &&
        renderIdentificationDataInfoVerification(
          updatedData.personalData.values,
        )}
      {stepKey === "contactData" &&
        renderContactDataInfoVerification(updatedData.contactData.values)}
      {stepKey === "informationData" &&
        renderInformationDataInfoVerification(
          updatedData.informationData.values,
          updatedData.personalData.values,
        )}
    </>
  );
}

export { VerificationFieldsets };
