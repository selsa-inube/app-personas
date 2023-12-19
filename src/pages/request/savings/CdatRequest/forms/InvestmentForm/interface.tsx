import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { handleChangeWithCurrency, validateCurrencyField } from "src/utils/formats";

interface InvestmentFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function InvestmentFormUI(props: InvestmentFormUIProps) {
        const { formik, loading, customHandleBlur } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

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
            state={stateValue("valueInvestment")}
            onBlur={customHandleBlur}
            onChange={(e)=>{handleChangeWithCurrency(formik,e)}}
            validMessage="El valor es válido"
            isRequired
          />
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
