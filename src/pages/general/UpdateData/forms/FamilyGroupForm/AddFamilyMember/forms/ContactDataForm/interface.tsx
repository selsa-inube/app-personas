import { TextField } from "@design/input/TextField";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";

interface ContactDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  readOnly?: boolean;
  isRequired: (fieldName: string) => boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const { formik, loading, readOnly, isRequired, customHandleBlur } = props;

  return (
    <>
      <TextField
        label="Celular"
        placeholder="Celular"
        name="cellPhone"
        id="cellPhone"
        type="number"
        size="compact"
        validMessage="El numero de celular es válido"
        value={formik.values.cellPhone || ""}
        errorMessage={formik.errors.cellPhone}
        onBlur={customHandleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "cellPhone")}
        isRequired={isRequired("cellPhone")}
        readOnly={readOnly}
        isFullWidth
      />
      <TextField
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        id="email"
        type="text"
        size="compact"
        validMessage="El correo electrónico es válido"
        value={formik.values.email || ""}
        errorMessage={formik.errors.email}
        onBlur={customHandleBlur}
        onChange={formik.handleChange}
        state={getFieldState(formik, "email")}
        isRequired={isRequired("email")}
        readOnly={readOnly}
        isFullWidth
      />
    </>
  );
}

export { ContactDataFormUI };