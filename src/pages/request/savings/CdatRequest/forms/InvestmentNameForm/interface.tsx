import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { getFieldState } from "src/utils/forms/forms";
import { IInvestmentNameEntry } from "./types";
import { FormikProps } from "formik";

interface InvestmentNameFormUIProps {
  formik: FormikProps<IInvestmentNameEntry>;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function InvestmentNameFormUI(props: InvestmentNameFormUIProps) {
  const { formik, loading } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <TextField
          label="Nombre del producto"
          placeholder="Ingresa un nombre para tu producto"
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
          maxLength={30}
          withCounter
        />
      </Stack>
    </form>
  );
}

export { InvestmentNameFormUI };
