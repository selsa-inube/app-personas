import { TextField } from "@design/input/TextField";
import { Select } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
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
        message={formik.errors.identificationNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "identificationNumber")}
        required={isRequired(validationSchema, "identificationNumber")}
        fullwidth
        readonly
      />
      <Select
        label="Tipo de documento"
        placeholder="Tipo de documento"
        name="type"
        id="type"
        size="compact"
        options={identificationTypeDM.options}
        onBlur={formik.handleBlur}
        message={formik.errors.type}
        onChange={(name, value) => formikHandleChange(name, value, formik)}
        value={formik.values.type || ""}
        invalid={isInvalid(formik, "type")}
        required={isRequired(validationSchema, "type")}
        disabled={readonly}
        fullwidth
      />
      <TextField
        label="Primer nombre"
        placeholder="Primer nombre"
        name="firstName"
        id="firstName"
        type="text"
        size="compact"
        value={formik.values.firstName || ""}
        message={formik.errors.firstName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstName")}
        required={isRequired(validationSchema, "firstName")}
        disabled={readonly}
        fullwidth
      />
      <TextField
        label="Segundo nombre"
        placeholder="Segundo nombre"
        name="secondName"
        id="secondName"
        type="text"
        size="compact"
        value={formik.values.secondName || ""}
        message={formik.errors.secondName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondName")}
        required={isRequired(validationSchema, "secondName")}
        disabled={readonly}
        fullwidth
      />
      <TextField
        label="Primer apellido"
        placeholder="Primer apellido"
        name="firstLastName"
        id="firstLastName"
        type="text"
        size="compact"
        value={formik.values.firstLastName || ""}
        message={formik.errors.firstLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "firstLastName")}
        required={isRequired(validationSchema, "firstLastName")}
        disabled={readonly}
        fullwidth
      />
      <TextField
        label="Segundo apellido"
        placeholder="Segundo apellido"
        name="secondLastName"
        id="secondLastName"
        type="text"
        size="compact"
        value={formik.values.secondLastName || ""}
        message={formik.errors.secondLastName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "secondLastName")}
        required={isRequired(validationSchema, "secondLastName")}
        disabled={readonly}
        fullwidth
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
    </>
  );
}

export { PersonalDataFormUI };
