import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Grid, Moneyfield, Stack, Text } from "@inubekit/inubekit";
import { getFieldState } from "@utils/forms/forms";
import { FormikProps } from "formik";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { IIncomesEntry } from "./types";

interface IncomesFormUIProps {
  formik: FormikProps<IIncomesEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  customHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function IncomesFormUI(props: IncomesFormUIProps) {
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
            label="Sueldo básico"
            placeholder="Digita el valor del sueldo básico"
            name="basicSalary"
            id="basicSalary"
            value={validateCurrencyField("basicSalary", formik)}
            message={formik.errors.basicSalary}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "basicSalary")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Bonos"
            placeholder="Digita el valor del bono"
            name="bonds"
            id="bonds"
            value={validateCurrencyField("bonds", formik)}
            message={formik.errors.bonds}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "bonds")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Comisiones"
            placeholder="Digita el valor de las comisiones"
            name="commissions"
            id="commissions"
            value={validateCurrencyField("commissions", formik)}
            message={formik.errors.commissions}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "commissions")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Horas extras"
            placeholder="Digita el valor de las horas extras"
            name="overtime"
            id="overtime"
            value={validateCurrencyField("overtime", formik)}
            message={formik.errors.overtime}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "overtime")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Auxilio de transporte"
            placeholder="Digita el valor del auxilio de transporte"
            name="transportationAssistance"
            id="transportationAssistance"
            value={validateCurrencyField("transportationAssistance", formik)}
            message={formik.errors.transportationAssistance}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "transportationAssitance")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Auxilio de alimentación"
            placeholder="Digita el valor del auxilio de alimentación"
            name="foodAssistance"
            id="foodAssistance"
            value={validateCurrencyField("foodAssistance", formik)}
            message={formik.errors.foodAssistance}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "foodAssitance")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Otros ingresos"
            placeholder="Digita el valor de otros ingresos"
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
            Total ingresos reportados:
          </Text>
          <Text type="title" size="medium">
            {currencyFormat(formik.values.totalIncomes || 0)}
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

export { IncomesFormUI };
