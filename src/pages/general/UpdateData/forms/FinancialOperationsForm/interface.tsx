import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Fieldset,
  Grid,
  Select,
  Stack,
  Textarea,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { IFinancialOperationsEntry } from "./types";

interface FinancialOperationsFormUIProps {
  formik: FormikProps<IFinancialOperationsEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading, withSubmit, validationSchema } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 610px)");

  const showForeignCurrencyTransactions =
    formik.values.hasForeignCurrencyTransactions === activeDM.Y.id;

  const showForeignCurrencyAccounts =
    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          width="100%"
          gap={
            isTablet
              ? inube.spacing.s200
              : `${inube.spacing.s200} ${inube.spacing.s300}`
          }
        >
          <Select
            label="¿Realiza operaciones en moneda extrajera?"
            name="hasForeignCurrencyTransactions"
            id="hasForeignCurrencyTransactions"
            value={formik.values.hasForeignCurrencyTransactions}
            size={isTablet ? "compact" : "wide"}
            fullwidth
            options={activeDM.options}
            message={formik.errors.hasForeignCurrencyTransactions}
            disabled={loading}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            invalid={isInvalid(formik, "hasForeignCurrencyTransactions")}
            required={isRequired(
              validationSchema,
              "hasForeignCurrencyTransactions",
            )}
            onBlur={formik.handleBlur}
          />

          <Select
            label="¿Posee cuentas en moneda extranjera?"
            name="hasForeignCurrencyAccounts"
            id="hasForeignCurrencyAccounts"
            value={formik.values.hasForeignCurrencyAccounts}
            size={isTablet ? "compact" : "wide"}
            fullwidth
            options={activeDM.options}
            message={formik.errors.hasForeignCurrencyAccounts}
            disabled={loading}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            invalid={isInvalid(formik, "hasForeignCurrencyAccounts")}
            required={isRequired(
              validationSchema,
              "hasForeignCurrencyAccounts",
            )}
            onBlur={formik.handleBlur}
          />
        </Grid>
        {showForeignCurrencyTransactions && (
          <>
            <Fieldset
              legend="Operaciones"
              type={isMobile ? "label" : "title"}
              size="medium"
            >
              <Textarea
                id="descriptionOperations"
                name="descriptionOperations"
                label="Descripción de las operaciones en moneda extrajera"
                placeholder="Escribe la descripción de las operaciones en moneda extrajera"
                maxLength={200}
                disabled={loading}
                value={formik.values.descriptionOperations}
                onChange={formik.handleChange}
                fullwidth
                required={isRequired(validationSchema, "descriptionOperations")}
                onBlur={formik.handleBlur}
              />
            </Fieldset>
          </>
        )}

        {showForeignCurrencyAccounts && (
          <>
            <Fieldset
              legend="Cuentas"
              type={isMobile ? "label" : "title"}
              size="medium"
            >
              <Grid
                templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
                autoRows="auto"
                gap={
                  isTablet
                    ? inube.spacing.s150
                    : `${inube.spacing.s200} ${inube.spacing.s300}`
                }
                width="100%"
              >
                <Select
                  label="País"
                  name="country"
                  id="country"
                  value={formik.values.country}
                  size={isTablet ? "compact" : "wide"}
                  fullwidth
                  options={countryDM.options}
                  message={formik.errors.country}
                  disabled={loading}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  required={isRequired(validationSchema, "country")}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  label="Entidad bancaria"
                  name="bankEntity"
                  id="bankEntity"
                  type="text"
                  placeholder="Digita la entidad bancaria"
                  value={formik.values.bankEntity}
                  size={isTablet ? "compact" : "wide"}
                  fullwidth
                  message={formik.errors.bankEntity}
                  disabled={loading}
                  onChange={formik.handleChange}
                  required={isRequired(validationSchema, "bankEntity")}
                  onBlur={formik.handleBlur}
                  state={getFieldState(formik, "bankEntity")}
                />
                <TextField
                  label="Moneda"
                  name="currency"
                  id="currency"
                  placeholder="Digita la moneda"
                  type="text"
                  value={formik.values.currency}
                  size={isTablet ? "compact" : "wide"}
                  fullwidth
                  message={formik.errors.currency}
                  max={3}
                  maxLength={3}
                  disabled={loading}
                  onChange={formik.handleChange}
                  required={isRequired(validationSchema, "currency")}
                  onBlur={formik.handleBlur}
                  state={getFieldState(formik, "currency")}
                />
                <TextField
                  label="Número de cuenta"
                  placeholder="Numero de cuenta"
                  name="accountNumber"
                  id="accountNumber"
                  type="number"
                  value={formik.values.accountNumber}
                  message={formik.errors.accountNumber}
                  disabled={loading}
                  size={isTablet ? "compact" : "wide"}
                  fullwidth
                  onChange={formik.handleChange}
                  state={getFieldState(formik, "accountNumber")}
                  required={isRequired(validationSchema, "accountNumber")}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Fieldset>
          </>
        )}

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

export { FinancialOperationsFormUI };
