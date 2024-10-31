import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IPlanNameEntry } from "./types";

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
        <TextField
          label="Nombre del producto"
          placeholder="Ingresa el nombre del producto"
          name="productName"
          id="productName"
          value={formik.values.productName}
          type="text"
          errorMessage={formik.errors.productName}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "productName")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          validMessage="El nombre del producto es válido"
          maxLength={30}
          withCounter
        />
      </Stack>
    </form>
  );
}

export { PlanNameFormUI };
