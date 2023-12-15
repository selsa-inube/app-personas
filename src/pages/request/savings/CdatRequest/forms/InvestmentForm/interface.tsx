import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";

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

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const validateCurrencyField = (fieldName: string) => {
    return typeof formik.values[fieldName] === "number"
      ? currencyFormat(formik.values[fieldName])
      : "";
  };


  const isMobile = useMediaQuery("(max-width: 750px)");

  const valueInvestmentDM = getDomainById("valueInvestment");

  return (
    <form>
      <Stack direction="column" gap="s300">
          <TextField
            label="Valor de la inversión"
            placeholder="Ingresa el valor a invertir"
            name="valueInvestment"
            id="valueInvestment"
            value={validateCurrencyField("valueInvestment")}
            type="text"
            errorMessage={formik.errors.valueInvestment}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={stateValue("valueInvestment")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor es válido"
            isRequired
          />
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
