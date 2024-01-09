import { Fieldset } from "@design/input/Fieldset";
import { TextField } from "@design/input/TextField";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";

interface IdentificationDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  isMobile?: boolean;
  isRequired: (fieldName: string) => boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function IdentificationDataFormUI(props: IdentificationDataFormUIProps) {
  const { formik, loading, isMobile, isRequired, customHandleBlur } = props;

  return (
    <Fieldset
      title="Número de identificación"
      size={isMobile ? "small" : "medium"}
    >
      <TextField
        label="Documento"
        placeholder="Documento"
        name="identificationNumber"
        id="identificationNumber"
        type="number"
        size="compact"
        validMessage="El documento es válido"
        value={formik.values.identificationNumber || ""}
        errorMessage={formik.errors.identificationNumber}
        onBlur={customHandleBlur}
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
