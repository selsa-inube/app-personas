import { inube } from "@design/tokens";
import { Select, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { residenceTypeDM } from "src/model/domains/general/updateData/personalResidence/residencetypedm";
import { formikHandleChange, isInvalid, isRequired } from "src/utils/forms/forms";
import { IResidenceTypeEntry } from "./types";
import * as Yup from "yup";

interface ResidenceTypeFormUIProps {
  formik: FormikProps<IResidenceTypeEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
}

function ResidenceTypeFormUI(props: ResidenceTypeFormUIProps) {
  const { formik, validationSchema, loading } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Select
          label="Tipo de vivienda"
          name="type"
          id="type"
          placeholder="Selecciona una opción"
          value={formik.values.type}
          fullwidth
          size="compact"
          options={[...residenceTypeDM.options].sort((a, b) => a.label.localeCompare(b.label))}
          onBlur={formik.handleBlur}
          disabled={loading}
          invalid={isInvalid(formik, "type")}
          onChange={(name, value) => formikHandleChange(name, value, formik)}
          required={isRequired(validationSchema, "type")}
        />
      </Stack>
    </form>
  );
}

export { ResidenceTypeFormUI };
