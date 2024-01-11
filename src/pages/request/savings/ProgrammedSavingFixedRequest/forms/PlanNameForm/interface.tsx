import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";

interface PlanNameFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlanNameFormUI(props: PlanNameFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  return (
    <form>
      <Stack direction="column" gap="s300">
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
          onBlur={customHandleBlur}
          onChange={formik.handleChange}
          validMessage="El nombre del producto es válido"
          maxLength={30}
          withCounter
          isRequired
        />
      </Stack>
    </form>
  );
}

export { PlanNameFormUI };
