import { inube } from "@design/tokens";
import { Stack, Textfield } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IPlanNameEntry } from "./types";
import { getFieldState } from "src/utils/forms/forms";

interface PlanNameFormUIProps {
  formik: FormikProps<IPlanNameEntry>;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlanNameFormUI(props: PlanNameFormUIProps) {
  const { formik, loading } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Textfield
          label="Nombre del producto"
          placeholder="Ingresa el nombre del producto"
          name="productName"
          id="productName"
          value={formik.values.productName}
          message={formik.errors.productName}
          disabled={loading}
          size="compact"
          fullwidth
          status={getFieldState(formik, "productName")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          maxLength={30}
        />
      </Stack>
    </form>
  );
}

export { PlanNameFormUI };
