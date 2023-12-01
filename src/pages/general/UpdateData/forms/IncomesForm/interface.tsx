import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";
import { getFieldState } from "src/utils/forms";

interface IncomesFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function IncomesFormUI(props: IncomesFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const validateCurrencyField = (fieldName: string) => {
    return typeof formik.values[fieldName] === "number"
      ? currencyFormat(formik.values[fieldName])
      : "";
  };

  const isMobile = useMediaQuery("(max-width: 700px)");
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
            label="Sueldo básico"
            placeholder="Digita el valor del sueldo básico"
            name="basicSalary"
            id="basicSalary"
            value={validateCurrencyField("basicSalary")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.basicSalary}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "basicSalary")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor del sueldo básico es válido"
          />
          <TextField
            label="Bonos"
            placeholder="Digita el valor del bono"
            name="bonds"
            id="bonds"
            value={validateCurrencyField("bonds")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.bonds}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "bonds")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor de los bonos es válido"
          />
          <TextField
            label="Comisiones"
            placeholder="Digita el valor de las comisiones"
            name="commissions"
            id="commissions"
            value={validateCurrencyField("commissions")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.commissions}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "commissions")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor de las comisiones es válido"
          />
          <TextField
            label="Horas extras"
            placeholder="Digita el valor de las horas extras"
            name="overtime"
            id="overtime"
            value={validateCurrencyField("overtime")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.overtime}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "overtime")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor de las horas extras es válido"
          />
          <TextField
            label="Auxilio de transporte"
            placeholder="Digita el valor del auxilio de transporte"
            name="transportationAssistance"
            id="transportationAssistance"
            value={validateCurrencyField("transportationAssistance")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.transportationAssistance}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "transportationAssistance")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor del auxilio de transporte es válido"
          />
          <TextField
            label="Auxilio de alimentación"
            placeholder="Digita el valor del auxilio de alimentación"
            name="foodAssistance"
            id="foodAssistance"
            value={validateCurrencyField("foodAssistance")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.foodAssistance}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "foodAssistance")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor del auxilio de alimentación es válido"
          />
          <TextField
            label="Otros ingresos"
            placeholder="Digita el valor de otros ingresos"
            name="others"
            id="others"
            value={validateCurrencyField("others")}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.others}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "others")}
            onBlur={customHandleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor de otros ingresos es válido"
          />
        </Grid>
        <Stack justifyContent="flex-end" alignItems="center" gap="s150">
          <Text type="body" size="medium">
            Total ingresos reportados:
          </Text>
          <Text type="title" size="medium">
            {currencyFormat(formik.values.totalIncomes || 0)}
          </Text>
        </Stack>
      </Stack>
    </form>
  );
}

export { IncomesFormUI };
