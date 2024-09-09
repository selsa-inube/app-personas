import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset } from "@inubekit/fieldset";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { FormikValues } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import { getFieldState } from "src/utils/forms/forms";

interface FinancialOperationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  withSubmit?: boolean;
  isRequired: (fieldName: string) => boolean;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading, withSubmit, isRequired } = props;

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
            isFullWidth
            options={activeDM.options}
            errorMessage={formik.errors.hasForeignCurrencyTransactions}
            isDisabled={loading}
            onChange={formik.handleChange}
            state={getFieldState(formik, "hasForeignCurrencyTransactions")}
            isRequired={isRequired("hasForeignCurrencyTransactions")}
            onBlur={formik.handleBlur}
          />

          <Select
            label="¿Posee cuentas en moneda extranjera?"
            name="hasForeignCurrencyAccounts"
            id="hasForeignCurrencyAccounts"
            value={formik.values.hasForeignCurrencyAccounts}
            size={isTablet ? "compact" : "wide"}
            isFullWidth
            options={activeDM.options}
            errorMessage={formik.errors.hasForeignCurrencyAccounts}
            isDisabled={loading}
            onChange={formik.handleChange}
            state={getFieldState(formik, "hasForeignCurrencyAccounts")}
            isRequired={isRequired("hasForeignCurrencyAccounts")}
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
                withCounter
                isDisabled={loading}
                value={formik.values.descriptionOperations}
                onChange={formik.handleChange}
                onFocus={formik.isFocused}
                lengthThreshold={20}
                isFullWidth
                isRequired={isRequired("descriptionOperations")}
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
                  isFullWidth
                  options={countryDM.options}
                  errorMessage={formik.errors.country}
                  isDisabled={loading}
                  onChange={formik.handleChange}
                  isRequired={isRequired("country")}
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
                  isFullWidth
                  errorMessage={formik.errors.bankEntity}
                  isDisabled={loading}
                  onChange={formik.handleChange}
                  isRequired={isRequired("bankEntity")}
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
                  isFullWidth
                  errorMessage={formik.errors.currency}
                  max={3}
                  maxLength={3}
                  isDisabled={loading}
                  onChange={formik.handleChange}
                  isRequired={isRequired("currency")}
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
                  errorMessage={formik.errors.accountNumber}
                  isDisabled={loading}
                  size={isTablet ? "compact" : "wide"}
                  isFullWidth
                  onChange={formik.handleChange}
                  state={getFieldState(formik, "accountNumber")}
                  isRequired={isRequired("accountNumber")}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Fieldset>
          </>
        )}

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={formik.handleReset}
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
