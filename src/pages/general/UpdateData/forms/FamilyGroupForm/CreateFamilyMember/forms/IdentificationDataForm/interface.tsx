import { TextField } from "@design/input/TextField";
import { Fieldset } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { IIdentificationDataEntry } from "./types";
import { getFieldState, isRequired } from "src/utils/forms/forms";

interface IdentificationDataFormUIProps {
  formik: FormikProps<IIdentificationDataEntry>;
  loading?: boolean;
  isMobile?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function IdentificationDataFormUI(props: IdentificationDataFormUIProps) {
  const { formik, loading, isMobile, validationSchema } = props;

  return (
    <Fieldset
      legend="Número de identificación"
      type="title"
      size={isMobile ? "small" : "medium"}
    >
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
        disabled={loading}
        required={isRequired(validationSchema, "identificationNumber")}
        fullwidth
      />
    </Fieldset>
  );
}

export { IdentificationDataFormUI };
