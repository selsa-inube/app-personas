import { inube } from "@design/tokens";
import {
  Stack,
  Textarea,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { getFieldStatus } from "src/utils/forms/forms";
import { IDetailsSituationEntry } from "./types";

interface DetailsSituationFormUIProps {
  formik: FormikProps<IDetailsSituationEntry>
}

function DetailsSituationFormUI(props: DetailsSituationFormUIProps) {
  const { formik } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Textarea
          id="message"
          name="message"
          label="Detalles adicionales"
          placeholder="Escribe los detalles que debemos tener en cuenta"
          maxLength={120}
          value={formik.values.message}
          message={formik.errors.message}
          status={getFieldStatus(formik, "message")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullwidth
        />
      </Stack>
    </form>
  );
}

export { DetailsSituationFormUI };
