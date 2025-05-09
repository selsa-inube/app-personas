import { Emailfield, Phonefield } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";
import { IContactDataEntry } from "./types";

interface ContactDataFormUIProps {
  formik: FormikProps<IContactDataEntry>;
  loading?: boolean;
  readonly?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const { formik, readonly, validationSchema } = props;

  return (
    <>
      <Phonefield
        label="Celular"
        placeholder="Celular"
        name="cellPhone"
        id="cellPhone"
        size="compact"
        value={formik.values.cellPhone || ""}
        message={formik.errors.cellPhone}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        status={getFieldState(formik, "cellPhone")}
        required={isRequired(validationSchema, "cellPhone")}
        disabled={readonly}
        fullwidth
      />
      <Emailfield
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        id="email"
        type="text"
        size="compact"
        value={formik.values.email || ""}
        message={formik.errors.email}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        status={getFieldState(formik, "email")}
        required={isRequired(validationSchema, "email")}
        disabled={readonly}
        fullwidth
      />
    </>
  );
}

export { ContactDataFormUI };
