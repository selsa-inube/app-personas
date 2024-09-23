import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { FormikProps } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";
import { IPersonalDataEntry } from "./types";

interface PersonalDataFormUIProps {
  formik: FormikProps<IPersonalDataEntry>;
  loading?: boolean;
  readonly?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function PersonalDataFormUI(props: PersonalDataFormUIProps) {
  const { formik, readonly, validationSchema } = props;

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
        isRequired={isRequired(validationSchema, "identificationNumber")}
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
        isRequired={isRequired(validationSchema, "type")}
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
        value={formik.values.firstName || ""}
        errorMessage={formik.errors.firstName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstName")}
        isRequired={isRequired(validationSchema, "firstName")}
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
        value={formik.values.secondName || ""}
        errorMessage={formik.errors.secondName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondName")}
        isRequired={isRequired(validationSchema, "secondName")}
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
        value={formik.values.firstLastName || ""}
        errorMessage={formik.errors.firstLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstLastName")}
        isRequired={isRequired(validationSchema, "firstLastName")}
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
        value={formik.values.secondLastName || ""}
        errorMessage={formik.errors.secondLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondLastName")}
        isRequired={isRequired(validationSchema, "secondLastName")}
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
            isRequired={isRequired(validationSchema, "relationship")}
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
            isRequired={isRequired(validationSchema, "isDependent")}
            isFullWidth
          />
        </>
      )}
    </>
  );
}

export { PersonalDataFormUI };
