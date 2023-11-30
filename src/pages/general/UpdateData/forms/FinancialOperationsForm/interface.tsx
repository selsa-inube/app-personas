import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { countryDM } from "src/model/domains/financialOperations/countrydm";
import { activeDM } from "src/model/domains/general/activedm";
import { getNoValidFieldState } from "src/utils/forms";

interface FinancialOperationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");

  const showForeignCurrencyFields =
    formik.values.hasForeignCurrencyTransactions === activeDM.Y.id ||
    formik.values.hasForeignCurrencyAccounts === activeDM.Y.id;

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Grid
          templateColumns={isTablet ? "1fr" : "1fr 1fr"}
          gap={
            isTablet ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`
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
            onBlur={customHandleBlur}
            errorMessage={formik.errors.hasForeignCurrencyTransactions}
            isDisabled={loading}
            state={getNoValidFieldState(
              formik,
              "hasForeignCurrencyTransactions"
            )}
            onChange={formik.handleChange}
            isRequired
          />

          <Select
            label="¿Posee cuentas en moneda extranjera?"
            name="hasForeignCurrencyAccounts"
            id="hasForeignCurrencyAccounts"
            value={formik.values.hasForeignCurrencyAccounts}
            size={isTablet ? "compact" : "wide"}
            isFullWidth
            options={activeDM.options}
            onBlur={customHandleBlur}
            errorMessage={formik.errors.hasForeignCurrencyAccounts}
            isDisabled={loading}
            state={getNoValidFieldState(formik, "hasForeignCurrencyAccounts")}
            onChange={formik.handleChange}
            isRequired
          />
        </Grid>
        {showForeignCurrencyFields && (
          <>
            <Textarea
              id="descriptionOperations"
              name="descriptionOperations"
              label="Descripción de las operaciones en moneda extrajera"
              placeholder="Escribe la descripción de las operaciones en moneda extrajera"
              maxLength={200}
              isDisabled={loading}
              value={formik.values.descriptionOperations}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
              onFocus={formik.isFocused}
              lengthThreshold={20}
              isFullWidth
            />

            <Grid
              templateColumns={isTablet ? "1fr" : "1fr 1fr"}
              gap={
                isTablet
                  ? "s150"
                  : `${inube.spacing.s200} ${inube.spacing.s300}`
              }
            >
              <Select
                label="País"
                name="country"
                id="country"
                value={formik.values.country}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                options={countryDM.options}
                onBlur={customHandleBlur}
                errorMessage={formik.errors.country}
                isDisabled={loading}
                onChange={formik.handleChange}
              />
              <Select
                label="Banco"
                name="bankEntity"
                id="bankEntity"
                value={formik.values.bankEntity}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                options={getDomainById("bankForeign")}
                onBlur={customHandleBlur}
                errorMessage={formik.errors.bankEntity}
                isDisabled={loading}
                onChange={formik.handleChange}
              />
              <Select
                label="Moneda"
                name="currency"
                id="currency"
                value={formik.values.currency}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                options={getDomainById("currency")}
                onBlur={customHandleBlur}
                errorMessage={formik.errors.currency}
                isDisabled={loading}
                onChange={formik.handleChange}
              />
              <TextField
                label="Numero de cuenta"
                placeholder="Numero de cuenta"
                name="accountNumber"
                id="accountNumber"
                value={formik.values.accountNumber}
                errorMessage={formik.errors.accountNumber}
                isDisabled={loading}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                state={getNoValidFieldState(formik, "accountNumber")}
                onBlur={customHandleBlur}
                onChange={formik.handleChange}
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
