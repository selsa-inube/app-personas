import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { FormikValues } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationtypedm";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipdm";
import { getFieldState } from "src/utils/forms/forms";

interface PersonalDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  readonly?: boolean;
  isRequired: (fieldName: string) => boolean;
}

function PersonalDataFormUI(props: PersonalDataFormUIProps) {
  const { formik, readonly, isRequired } = props;

  return (
    <>
      <TextField
        label="Documento"
        placeholder="Documento"
        name="identificationNumber"
        id="identificationNumber"
        type="number"
        size="compact"
        value={formik.values.identificationNumber || ""}
        errorMessage={formik.errors.identificationNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "identificationNumber")}
        isRequired={isRequired("identificationNumber")}
        isFullWidth
        readOnly
      />
      <Select
        label="Tipo de documento"
        placeholder="Tipo de documento"
        name="type"
        id="type"
        size="compact"
        options={identificationTypeDM.options}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.type}
        onChange={formik.handleChange}
        value={formik.values.type || ""}
        state={getFieldState(formik, "type")}
        isRequired={isRequired("type")}
        readOnly={readonly}
        isFullWidth
      />
      <TextField
        label="Primer nombre"
        placeholder="Primer nombre"
        name="firstName"
        id="firstName"
        type="text"
        size="compact"
        validMessage="El primer nombre es válido"
        value={formik.values.firstName || ""}
        errorMessage={formik.errors.firstName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstName")}
        isRequired={isRequired("firstName")}
        readOnly={readonly}
        isFullWidth
      />
      <TextField
        label="Segundo nombre"
        placeholder="Segundo nombre"
        name="secondName"
        id="secondName"
        type="text"
        size="compact"
        validMessage="El segundo nombre es válido"
        value={formik.values.secondName || ""}
        errorMessage={formik.errors.secondName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondName")}
        isRequired={isRequired("secondName")}
        readOnly={readonly}
        isFullWidth
      />
      <TextField
        label="Primer apellido"
        placeholder="Primer apellido"
        name="firstLastName"
        id="firstLastName"
        type="text"
        size="compact"
        validMessage="El primer apellido es válido"
        value={formik.values.firstLastName || ""}
        errorMessage={formik.errors.firstLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstLastName")}
        isRequired={isRequired("firstLastName")}
        readOnly={readonly}
        isFullWidth
      />
      <TextField
        label="Segundo apellido"
        placeholder="Segundo apellido"
        name="secondLastName"
        id="secondLastName"
        type="text"
        size="compact"
        validMessage="El segundo apellido es válido"
        value={formik.values.secondLastName || ""}
        errorMessage={formik.errors.secondLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondLastName")}
        isRequired={isRequired("secondLastName")}
        readOnly={readonly}
        isFullWidth
      />
      {readonly && (
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
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.isDependent}
            onChange={formik.handleChange}
            value={formik.values.isDependent || ""}
            state={getFieldState(formik, "isDependent")}
            isRequired={isRequired("isDependent")}
            isFullWidth
          />
        </>
      )}
    </>
  );
}

export { PersonalDataFormUI };
