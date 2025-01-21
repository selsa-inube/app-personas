import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
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
          <TextField
            label="Sueldo básico"
            placeholder="Digita el valor del sueldo básico"
            name="basicSalary"
            id="basicSalary"
            value={validateCurrencyField("basicSalary", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.basicSalary}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "basicSalary")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Bonos"
            placeholder="Digita el valor del bono"
            name="bonds"
            id="bonds"
            value={validateCurrencyField("bonds", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.bonds}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "bonds")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Comisiones"
            placeholder="Digita el valor de las comisiones"
            name="commissions"
            id="commissions"
            value={validateCurrencyField("commissions", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.commissions}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "commissions")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Horas extras"
            placeholder="Digita el valor de las horas extras"
            name="overtime"
            id="overtime"
            value={validateCurrencyField("overtime", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.overtime}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "overtime")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Auxilio de transporte"
            placeholder="Digita el valor del auxilio de transporte"
            name="transportationAssistance"
            id="transportationAssistance"
            value={validateCurrencyField("transportationAssistance", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.transportationAssistance}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "transportationAssistance")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Auxilio de alimentación"
            placeholder="Digita el valor del auxilio de alimentación"
            name="foodAssistance"
            id="foodAssistance"
            value={validateCurrencyField("foodAssistance", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.foodAssistance}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "foodAssistance")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <TextField
            label="Otros ingresos"
            placeholder="Digita el valor de otros ingresos"
            name="others"
            id="others"
            value={validateCurrencyField("others", formik)}
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.others}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "others")}
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
