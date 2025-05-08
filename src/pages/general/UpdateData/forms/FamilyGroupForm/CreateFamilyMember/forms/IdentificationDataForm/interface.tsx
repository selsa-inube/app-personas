import { Fieldset, Numberfield } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";
import { IIdentificationDataEntry } from "./types";

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
      <Numberfield
        label="Documento"
        placeholder="Documento"
        name="identificationNumber"
        id="identificationNumber"
        size="compact"
        value={formik.values.identificationNumber || ""}
        message={formik.errors.identificationNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        status={getFieldState(formik, "identificationNumber")}
        disabled={loading}
        required={isRequired(validationSchema, "identificationNumber")}
        fullwidth
      />
    </Fieldset>
  );
}

export { IdentificationDataFormUI };
