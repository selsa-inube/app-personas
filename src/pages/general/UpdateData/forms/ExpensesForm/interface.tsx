import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Grid, Moneyfield, Stack, Text } from "@inubekit/inubekit";
import { getFieldState } from "@utils/forms/forms";
import { FormikProps } from "formik";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { IExpensesEntry } from "./types";

interface ExpensesFormUIProps {
  formik: FormikProps<IExpensesEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  customHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ExpensesFormUI(props: ExpensesFormUIProps) {
  const { formik, loading, withSubmit, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
          autoRows="auto"
          gap={
            isMobile
              ? inube.spacing.s150
              : isTablet
                ? inube.spacing.s200
                : inube.spacing.s300
          }
        >
          <Moneyfield
            label="Gastos personales"
            placeholder="Digita el valor de los gastos personales"
            name="personalExpenses"
            id="personalExpenses"
            value={validateCurrencyField("personalExpenses", formik)}
            message={formik.errors.personalExpenses}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "personalExpenses")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Gastos familiares"
            placeholder="Digita el valor de los gastos familiares"
            name="familyExpenses"
            id="familyExpenses"
            value={validateCurrencyField("familyExpenses", formik)}
            message={formik.errors.familyExpenses}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "familyExpenses")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Créditos"
            placeholder="Digita el valor de los créditos"
            name="credits"
            id="credits"
            value={validateCurrencyField("credits", formik)}
            message={formik.errors.credits}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "credits")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Tarjetas de crédito"
            placeholder="Digita el valor de las tarjetas de crédito"
            name="creditCards"
            id="creditCards"
            value={validateCurrencyField("creditCards", formik)}
            message={formik.errors.creditCards}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "creditCards")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Otros gastos"
            placeholder="Digita el valor de otros gastos"
            name="others"
            id="others"
            value={validateCurrencyField("others", formik)}
            message={formik.errors.others}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "others")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
        </Grid>
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          gap={inube.spacing.s150}
        >
          <Text type="body" size="medium">
            Total gastos reportados:
          </Text>
          <Text type="title" size="medium">
            {currencyFormat(formik.values.totalExpenses || 0)}
          </Text>
        </Stack>
        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={loading || !formik.dirty || !formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { ExpensesFormUI };
