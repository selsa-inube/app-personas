import { DateField } from "@design/input/DateField";
import { Select } from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikProps } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { educationLevelTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/educationLeveldm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { IInformationDataEntry } from "./types";

interface InformationDataFormUIProps {
  formik: FormikProps<IInformationDataEntry>;
  loading?: boolean;
  readonly?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function InformationDataFormUI(props: InformationDataFormUIProps) {
  const { formik, readonly, validationSchema } = props;

  return (
    <>
      {!readonly && (
        <>
          <Select
            label="Parentesco"
            placeholder="Parentesco"
            name="relationship"
            id="relationship"
            size="compact"
            options={relationshipDM.options}
            onBlur={formik.handleBlur}
            message={formik.errors.relationship}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            value={formik.values.relationship || ""}
            invalid={isInvalid(formik, "relationship")}
            required={isRequired(validationSchema, "relationship")}
            fullwidth
          />
          <Select
            label="Depende económicamente"
            placeholder="Depende económicamente"
            name="isDependent"
            id="isDependent"
            size="compact"
            options={activeDM.options}
            onBlur={formik.handleBlur}
            message={formik.errors.isDependent}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            value={formik.values.isDependent || ""}
            invalid={isInvalid(formik, "isDependent")}
            required={isRequired(validationSchema, "isDependent")}
            fullwidth
          />
        </>
      )}
      <Select
        label="Nivel de escolaridad"
        placeholder="Nivel de escolaridad"
        name="educationLevel"
        id="educationLevel"
        size="compact"
        options={educationLevelTypeDM.options}
        onBlur={formik.handleBlur}
        message={formik.errors.educationLevel}
        onChange={(name, value) => formikHandleChange(name, value, formik)}
        value={formik.values.educationLevel || ""}
        invalid={isInvalid(formik, "educationLevel")}
        required={isRequired(validationSchema, "educationLevel")}
        disabled={readonly}
        fullwidth
      />
      <Select
        label="Profesión"
        placeholder="Profesión"
        name="profession"
        id="profession"
        size="compact"
        options={getDomainById("profession")}
        onBlur={formik.handleBlur}
        message={formik.errors.profession}
        onChange={(name, value) => formikHandleChange(name, value, formik)}
        value={formik.values.profession || ""}
        invalid={isInvalid(formik, "profession")}
        required={isRequired(validationSchema, "profession")}
        disabled={readonly}
        fullwidth
      />
      <Select
        label="Genero"
        placeholder="Genero"
        name="gender"
        id="gender"
        size="compact"
        options={genderDM.options}
        onBlur={formik.handleBlur}
        message={formik.errors.gender}
        onChange={(name, value) => formikHandleChange(name, value, formik)}
        value={formik.values.gender || ""}
        invalid={isInvalid(formik, "gender")}
        required={isRequired(validationSchema, "gender")}
        disabled={readonly}
        fullwidth
      />
      <DateField
        label="Fecha de nacimiento"
        name="birthDate"
        id="birthDate"
        value={formik.values.birthDate}
        message={formik.errors.birthDate}
        state={getFieldState(formik, "birthDate")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        required={isRequired(validationSchema, "birthDate")}
        disabled={readonly}
        fullwidth
      />
      <Select
        label="Actividad económica"
        placeholder="Actividad económica"
        name="businessActivity"
        id="businessActivity"
        size="compact"
        options={getDomainById("economicSector")}
        onBlur={formik.handleBlur}
        message={formik.errors.businessActivity}
        onChange={(name, value) => formikHandleChange(name, value, formik)}
        value={formik.values.businessActivity || ""}
        invalid={isInvalid(formik, "businessActivity")}
        required={isRequired(validationSchema, "businessActivity")}
        disabled={readonly}
        fullwidth
      />
    </>
  );
}

export { InformationDataFormUI };
