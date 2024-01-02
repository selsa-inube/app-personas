import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";

interface InvestmentFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function InvestmentFormUI(props: InvestmentFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  return (
    <form>
      <Stack direction="column" gap="s300">
        <TextField
          label="Valor de la inversión"
          placeholder="Ingresa el valor a invertir"
          name="valueInvestment"
          id="valueInvestment"
          value={validateCurrencyField("valueInvestment", formik)}
          type="text"
          errorMessage={formik.errors.valueInvestment}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "valueInvestment")}
          onBlur={customHandleBlur}
          onChange={(e) => {
            handleChangeWithCurrency(formik, e);
          }}
          validMessage="El valor es válido"
          isRequired
        />
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
