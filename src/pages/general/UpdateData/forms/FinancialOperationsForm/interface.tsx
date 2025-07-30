import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Autocomplete,
  Button,
  Fieldset,
  Grid,
  IOption,
  Select,
  Stack,
  Textarea,
  Textfield,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IServiceDomains } from "src/context/app/types";
import { activeDM } from "src/model/domains/general/activedm";
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
  serviceDomains: IServiceDomains;
  currencies: {
    loading: boolean;
    list: IOption[];
  };
  onChangeForeignTransactions: (name: string, value: string) => void;
  onChangeForeignAccounts: (name: string, value: string) => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const {
    formik,
    loading,
    withSubmit,
    validationSchema,
    serviceDomains,
    currencies,
    onChangeForeignTransactions,
    onChangeForeignAccounts,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");

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
            size="compact"
            fullwidth
            options={activeDM.options}
            message={formik.errors.hasForeignCurrencyTransactions}
            disabled={loading}
            onChange={onChangeForeignTransactions}
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
            size="compact"
            fullwidth
            options={activeDM.options}
            message={formik.errors.hasForeignCurrencyAccounts}
            disabled={loading}
            onChange={onChangeForeignAccounts}
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
                required={
                  formik.values.hasForeignCurrencyTransactions === activeDM.Y.id
                }
                onBlur={formik.handleBlur}
              />
            </Fieldset>
          </>
        )}

        {showForeignCurrencyAccounts && (
          <>
            <Fieldset
              legend="Cuentas"
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
                <Autocomplete
                  label="País"
                  name="country"
                  id="country"
                  placeholder="Selecciona el país"
                  value={formik.values.country}
                  size="compact"
                  fullwidth
                  options={serviceDomains.countries}
                  message={formik.errors.country}
                  disabled={loading}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  required={
                    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id
                  }
                  onBlur={formik.handleBlur}
                />
                <Textfield
                  label="Entidad bancaria"
                  name="bankEntity"
                  id="bankEntity"
                  placeholder="Digita la entidad bancaria"
                  value={formik.values.bankEntity}
                  size="compact"
                  fullwidth
                  message={formik.errors.bankEntity}
                  disabled={loading}
                  onChange={formik.handleChange}
                  required={
                    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id
                  }
                  onBlur={formik.handleBlur}
                />
                <Select
                  label="Moneda"
                  name="currency"
                  id="currency"
                  placeholder="Selecciona la moneda"
                  value={formik.values.currency}
                  size="compact"
                  fullwidth
                  options={currencies.list}
                  message={formik.errors.currency}
                  disabled={loading}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  required={
                    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id
                  }
                />
                <Textfield
                  label="Número de cuenta"
                  placeholder="Numero de cuenta"
                  name="accountNumber"
                  id="accountNumber"
                  value={formik.values.accountNumber}
                  message={formik.errors.accountNumber}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  onChange={formik.handleChange}
                  status={getFieldState(formik, "accountNumber")}
                  required={
                    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id
                  }
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
