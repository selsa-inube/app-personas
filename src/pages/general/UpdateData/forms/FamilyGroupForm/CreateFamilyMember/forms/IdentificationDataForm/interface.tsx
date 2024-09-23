import { TextField } from "@design/input/TextField";
import { Fieldset } from "@inubekit/fieldset";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IIdentificationDataEntry } from "./types";

interface IdentificationDataFormUIProps {
  formik: FormikProps<IIdentificationDataEntry>;
  loading?: boolean;
  isMobile?: boolean;
  isRequired: (fieldName: string) => boolean;
}

function IdentificationDataFormUI(props: IdentificationDataFormUIProps) {
  const { formik, loading, isMobile, isRequired } = props;

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
        isRequired={isRequired("identificationNumber")}
        isFullWidth
      />
    </Fieldset>
  );
}

export { IdentificationDataFormUI };
