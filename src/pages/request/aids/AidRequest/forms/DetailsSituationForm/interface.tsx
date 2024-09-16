import { Textarea } from "@design/input/Textarea";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IDetailsSituationEntry } from "./types";

interface DetailsSituationFormUIProps {
  formik: FormikProps<IDetailsSituationEntry>;
}

function DetailsSituationFormUI(props: DetailsSituationFormUIProps) {
  const { formik } = props;

  return (
    <form>
      <Textarea
        id="message"
        name="message"
        label="Detalles adicionales"
        placeholder="Escribe los detalles que debemos tener en cuenta"
        maxLength={120}
        value={formik.values.message}
        errorMessage={formik.errors.message}
        state={getFieldState(formik, "message")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        withCounter
        isFullWidth
      />
    </form>
  );
}

export { DetailsSituationFormUI };
