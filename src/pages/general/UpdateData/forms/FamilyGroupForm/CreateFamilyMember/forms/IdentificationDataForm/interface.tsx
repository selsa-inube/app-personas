import { TextField } from "@design/input/TextField";
import { Fieldset } from "@inubekit/fieldset";
import { FormikValues } from "formik";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";

interface IdentificationDataFormUIProps {
  formik: FormikValues;
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
        errorMessage={formik.errors.identificationNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "identificationNumber")}
        isDisabled={loading}
        isRequired={isRequired(validationSchema, "identificationNumber")}
        isFullWidth
      />
    </Fieldset>
  );
}

export { IdentificationDataFormUI };
