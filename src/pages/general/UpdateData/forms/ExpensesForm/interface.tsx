import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";
import { getFieldState } from "src/utils/forms";

interface ExpensesFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  totalExpenses: number;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function ExpensesFormUI(props: ExpensesFormUIProps) {
  const { formik, loading, totalExpenses, customHandleBlur } = props;

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
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Grid
          templateColumns={
            isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
          }
          gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
        >
          <TextField
            label="Gatos personales"
            placeholder="Digita el valor de los gastos personales"
            name="personalExpenses"
            id="personalExpenses"
            value={validateCurrencyField("personalExpenses")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.personalExpenses}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "personalExpenses")}
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de los gastos personales es válido"
          />
          <TextField
            label="Gastos familiares"
            placeholder="Digita el valor de los gastos familiares"
            name="familyExpenses"
            id="familyExpenses"
            value={validateCurrencyField("familyExpenses")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.familyExpenses}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "familyExpenses")}
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de los gastos familiares es válido"
          />
          <TextField
            label="Créditos"
            placeholder="Digita el valor de los créditos"
            name="credits"
            id="credits"
            value={validateCurrencyField("credits")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.credits}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "credits")}
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de los créditos es válido"
          />
          <TextField
            label="Tarjetas de crédito"
            placeholder="Digita el valor de las tarjetas de crédito"
            name="creditCards"
            id="creditCards"
            value={validateCurrencyField("creditCards")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.creditCards}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "creditCards")}
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de las tarjetas de crédito es válido"
          />
          <TextField
            label="Salud"
            placeholder=""
            name="health"
            id="health"
            value={validateCurrencyField("health")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.health}
            isDisabled={loading}
            size="compact"
            isFullWidth
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            readOnly
          />
          <TextField
            label="Pensión"
            placeholder=""
            name="pension"
            id="pension"
            value={validateCurrencyField("pension")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.pension}
            isDisabled={loading}
            size="compact"
            isFullWidth
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            readOnly
          />
          <TextField
            label="Otros gastos"
            placeholder="Digita el valor de otros gastos"
            name="others"
            id="others"
            value={validateCurrencyField("others")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.others}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "others")}
            handleBlur={customHandleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de otros gastos es válido"
          />
        </Grid>
        <Stack justifyContent="flex-end" alignItems="center" gap="s150">
          <Text type="body" size="medium">
            Total gastos reportados:
          </Text>
          <Text type="title" size="medium">
            {currencyFormat(totalExpenses)}
          </Text>
        </Stack>
      </Stack>
    </form>
  );
}

export { ExpensesFormUI };
