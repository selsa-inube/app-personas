import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";
import { educationLevelTypeDM } from "src/model/domains/socioeconomicInformation/educationLeveldm";
import { getFieldState } from "src/utils/forms/forms";

interface InformationDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  isRequired: (fieldName: string) => boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function InformationDataFormUI(props: InformationDataFormUIProps) {
  const { formik, loading, isRequired, customHandleBlur } = props;

  return (
    <>
      {formik.values.type !== "" && (
        <>
          <Select
            label="Parentesco"
            placeholder="Parentesco"
            name="relationship"
            id="relationship"
            size="compact"
            options={relationshipDM.options}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.relationship}
            onChange={formik.handleChange}
            value={formik.values.relationship || ""}
            state={getFieldState(formik, "relationship")}
            isRequired={isRequired("relationship")}
            isFullWidth
          />
          <Select
            label="Depende económicamente"
            placeholder="Depende económicamente"
            name="isDependent"
            id="isDependent"
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            value={formik.values.isDependent || ""}
            state={getFieldState(formik, "isDependent")}
            isRequired={isRequired("isDependent")}
            isFullWidth
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
        errorMessage={formik.errors.educationLevel}
        onChange={formik.handleChange}
        value={formik.values.educationLevel || ""}
        state={getFieldState(formik, "educationLevel")}
        isRequired={isRequired("educationLevel")}
        isFullWidth
      />
      <Select
        label="Profesión u oficio"
        placeholder="Profesión u oficio"
        name="profession"
        id="profession"
        size="compact"
        options={getDomainById("profession")}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.profession}
        onChange={formik.handleChange}
        value={formik.values.profession || ""}
        state={getFieldState(formik, "profession")}
        isRequired={isRequired("profession")}
        isFullWidth
      />
      <Select
        label="Genero"
        placeholder="Genero"
        name="gender"
        id="gender"
        size="compact"
        options={genderDM.options}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.gender}
        onChange={formik.handleChange}
        value={formik.values.gender || ""}
        state={getFieldState(formik, "gender")}
        isRequired={isRequired("gender")}
        isFullWidth
      />
      <TextField
        label="Fecha de nacimiento"
        placeholder="Fecha de nacimiento"
        name="birthDate"
        id="birthDate"
        type="text"
        size="compact"
        validMessage="La fecha de nacimiento es válida"
        value={formik.values.birthDate || ""}
        errorMessage={formik.errors.birthDate}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "birthDate")}
        isRequired={isRequired("birthDate")}
        isFullWidth
      />
      <Select
        label="Actividad económica"
        placeholder="Actividad económica"
        name="businessActivity"
        id="businessActivity"
        size="compact"
        options={getDomainById("economicSector")}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.businessActivity}
        onChange={formik.handleChange}
        value={formik.values.businessActivity || ""}
        state={getFieldState(formik, "businessActivity")}
        isRequired={isRequired("businessActivity")}
        isFullWidth
      />
    </>
  );
}

export { InformationDataFormUI };
