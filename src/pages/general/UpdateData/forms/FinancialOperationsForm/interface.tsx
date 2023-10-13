import { inube } from "@design/tokens";
import { Select } from "@design/input/Select";
import { Textarea } from "@design/input/Textarea";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
import { countryDM } from "src/model/domains/financialOperations/countrydm";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { Stack } from "@design/layout/Stack";

interface FinancialOperationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const mquery = useMediaQuery("(max-width: 1200px)");

  const shouldShowForeignCurrencyFields =
    formik.values.hasForeignCurrencyTransactions === activeDM.Y.id ||
    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id;

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Grid
          templateColumns={mquery ? "1fr" : "1fr 1fr"}
          gap={mquery ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`}
        >
          <Select
            label="¿Realiza operaciones en moneda extrajera?"
            name="hasForeignCurrencyTransactions"
            id="hasForeignCurrencyTransactions"
            value={formik.values.hasForeignCurrencyTransactions}
            size={mquery ? "compact" : "wide"}
            isFullWidth
            options={activeDM.options}
            handleBlur={customHandleBlur}
            errorMessage={formik.errors.hasForeignCurrencyTransactions}
            isDisabled={loading}
            state={stateValue("hasForeignCurrencyTransactions")}
            handleChange={formik.handleChange}
            isRequired
          />

          <Select
            label="¿Posee cuentas en moneda extranjera?"
            name="hasForeignCurrencyAccounts"
            id="hasForeignCurrencyAccounts"
            value={formik.values.hasForeignCurrencyAccounts}
            size={mquery ? "compact" : "wide"}
            isFullWidth
            options={activeDM.options}
            handleBlur={customHandleBlur}
            errorMessage={formik.errors.hasForeignCurrencyAccounts}
            isDisabled={loading}
            state={stateValue("hasForeignCurrencyAccounts")}
            handleChange={formik.handleChange}
            isRequired
          />
        </Grid>
        {shouldShowForeignCurrencyFields && (
          <>
            <Textarea
              id="descriptionOperationsForeignCurrency"
              name="descriptionOperationsForeignCurrency"
              label="Descripción de las operaciones en moneda extrajera"
              placeholder="Escribe la descripción de las operaciones en moneda extrajera"
              maxLength={200}
              isDisabled={loading}
              value={formik.values.descriptionOperationsForeignCurrency}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              handleFocus={formik.isFocused}
              lengthThreshold={20}
              isFullWidth
            />

            <Grid
              templateColumns={mquery ? "1fr" : "1fr 1fr"}
              gap={
                mquery ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`
              }
            >
              <Select
                label="País"
                name="country"
                id="country"
                value={formik.values.country}
                size={mquery ? "compact" : "wide"}
                isFullWidth
                options={countryDM.options}
                handleBlur={customHandleBlur}
                errorMessage={formik.errors.country}
                isDisabled={loading}
                handleChange={formik.handleChange}
              />
              <Select
                label="Banco"
                name="bankingEntity"
                id="bankingEntity"
                value={formik.values.bankingEntity}
                size={mquery ? "compact" : "wide"}
                isFullWidth
                options={getDomainById("bankForeign")}
                handleBlur={customHandleBlur}
                errorMessage={formik.errors.bankingEntity}
                isDisabled={loading}
                handleChange={formik.handleChange}
              />
              <Select
                label="Moneda"
                name="currency"
                id="currency"
                value={formik.values.currency}
                size={mquery ? "compact" : "wide"}
                isFullWidth
                options={getDomainById("currency")}
                handleBlur={customHandleBlur}
                errorMessage={formik.errors.currency}
                isDisabled={loading}
                handleChange={formik.handleChange}
              />
              <TextField
                label="Numero de cuenta"
                placeholder="Numero de cuenta"
                name="accountNumber"
                id="accountNumber"
                value={formik.values.accountNumber}
                errorMessage={formik.errors.accountNumber}
                isDisabled={loading}
                size={mquery ? "compact" : "wide"}
                isFullWidth
                state={stateValue("accountNumber")}
                handleBlur={customHandleBlur}
                handleChange={formik.handleChange}
                validMessage="El numero de cuenta es válido"
              />
            </Grid>
          </>
        )}
      </Stack>
    </form>
  );
}

export { FinancialOperationsFormUI };
