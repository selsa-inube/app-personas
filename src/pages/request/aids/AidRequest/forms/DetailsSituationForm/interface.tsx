import { FormikProps } from "formik";
import { IDetailsSituationEntry } from "./types";
import { Textarea } from "@design/input/Textarea";
import { getFieldState } from "src/utils/forms/forms";

interface DetailsSituationFormUIProps {
  formik: FormikProps<IDetailsSituationEntry>;
}

function DetailsSituationFormUI(props: DetailsSituationFormUIProps) {
  const { formik } = props;

  return (
    <form>
      <Textarea
        id="detailsSituation"
        name="detailsSituation"
        label="Detalles adicionales"
        placeholder="Escribe los detalles que debemos tener en cuenta"
        maxLength={120}
        value={formik.values.detailsSituation}
        errorMessage={formik.errors.detailsSituation}
        state={getFieldState(formik, "detailsSituation")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        withCounter
        isFullWidth
        isRequired
      />
    </form>
  );
}

export { DetailsSituationFormUI };
