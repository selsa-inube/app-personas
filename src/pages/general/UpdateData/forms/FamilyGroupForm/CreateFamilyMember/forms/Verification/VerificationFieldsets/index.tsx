import {
  Date,
  Emailfield,
  Phonefield,
  Select,
  Textfield,
} from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { activeDM } from "src/model/domains/general/activedm";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { educationLevelTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/educationLeveldm";
import { IFormsCreateFamilyMember } from "../../../types";
import { IContactDataEntry } from "../../ContactDataForm/types";
import { IInformationDataEntry } from "../../InformationDataForm/types";
import { IPersonalDataEntry } from "../../PersonalDataForm/types";

const renderIdentificationDataInfoVerification = (
  values: IPersonalDataEntry,
) => (
  <>
    {values.identificationNumber && (
      <Textfield
        label="Documento"
        placeholder="Documento"
        name="identificationNumber"
        id="identificationNumber"
        type="number"
        size="compact"
        value={values.identificationNumber}
        fullwidth
        disabled
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
        fullwidth
        readonly
        onChange={() => true}
      />
    )}
    {values.firstName && (
      <Textfield
        label="Primer nombre"
        placeholder="Primer nombre"
        name="firstName"
        id="firstName"
        type="text"
        size="compact"
        value={values.firstName}
        fullwidth
        disabled
      />
    )}
    {values.secondName && (
      <Textfield
        label="Segundo nombre"
        placeholder="Segundo nombre"
        name="secondName"
        id="secondName"
        type="text"
        size="compact"
        value={values.secondName}
        fullwidth
        disabled
      />
    )}
    {values.firstLastName && (
      <Textfield
        label="Primer apellido"
        placeholder="Primer apellido"
        name="firstLastName"
        id="firstLastName"
        type="text"
        size="compact"
        value={values.firstLastName}
        fullwidth
        disabled
      />
    )}
    {values.secondLastName && (
      <Textfield
        label="Segundo apellido"
        placeholder="Segundo apellido"
        name="secondLastName"
        id="secondLastName"
        type="text"
        size="compact"
        value={values.secondLastName}
        fullwidth
        disabled
      />
    )}
  </>
);

const renderContactDataInfoVerification = (values: IContactDataEntry) => (
  <>
    {values.cellPhone && (
      <Phonefield
        label="Celular"
        placeholder="Celular"
        name="cellPhone"
        id="cellPhone"
        type="number"
        size="compact"
        value={values.cellPhone}
        fullwidth
        disabled
      />
    )}
    {values.email && (
      <Emailfield
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        id="email"
        type="text"
        size="compact"
        value={values.email}
        fullwidth
        disabled
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
        value={
          informationValues.relationship ?? personalValues.relationship ?? ""
        }
        fullwidth
        readonly
        onChange={() => true}
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
        value={
          informationValues.isDependent ?? personalValues.isDependent ?? ""
        }
        fullwidth
        readonly
        onChange={() => true}
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
        fullwidth
        readonly
        onChange={() => true}
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
        fullwidth
        readonly
        onChange={() => true}
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
        fullwidth
        readonly
        onChange={() => true}
      />
    )}
    {informationValues.birthDate && (
      <Date
        label="Fecha de nacimiento"
        name="birthDate"
        id="birthDate"
        size="compact"
        value={informationValues.birthDate}
        fullwidth
        disabled
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
        fullwidth
        readonly
        onChange={() => true}
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
