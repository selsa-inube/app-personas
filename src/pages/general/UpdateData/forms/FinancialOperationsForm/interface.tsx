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
import { getFieldState } from "src/utils/forms";

interface FinancialOperationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  isRequired: (fieldName: string) => boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading, isRequired, customHandleBlur } = props;

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
            errorMessage={formik.errors.hasForeignCurrencyTransactions}
            isDisabled={loading}
            onChange={formik.handleChange}
            state={getFieldState(formik, "hasForeignCurrencyTransactions")}
            isRequired={isRequired("hasForeignCurrencyTransactions")}
            onBlur={customHandleBlur}
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
            onBlur={customHandleBlur}
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
              withCounter
              isDisabled={loading}
              value={formik.values.descriptionOperations}
              onChange={formik.handleChange}
              onFocus={formik.isFocused}
              lengthThreshold={20}
              isFullWidth
              isRequired={isRequired("descriptionOperations")}
              onBlur={customHandleBlur}
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
                errorMessage={formik.errors.country}
                isDisabled={loading}
                onChange={formik.handleChange}
                isRequired={isRequired("country")}
                onBlur={customHandleBlur}
              />
              <Select
                label="Banco"
                name="bankEntity"
                id="bankEntity"
                value={formik.values.bankEntity}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                errorMessage={formik.errors.bankEntity}
                isDisabled={loading}
                onChange={formik.handleChange}
                options={getDomainById("bankForeign")}
                isRequired={isRequired("bankEntity")}
                onBlur={customHandleBlur}
              />
              <Select
                label="Moneda"
                name="currency"
                id="currency"
                value={formik.values.currency}
                size={isTablet ? "compact" : "wide"}
                isFullWidth
                errorMessage={formik.errors.currency}
                isDisabled={loading}
                onChange={formik.handleChange}
                options={getDomainById("currency")}
                isRequired={isRequired("currency")}
                onBlur={customHandleBlur}
              />
              <TextField
                label="Numero de cuenta"
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
                validMessage="El numero de cuenta es válido"
                state={getFieldState(formik, "accountNumber")}
                isRequired={isRequired("accountNumber")}
                onBlur={customHandleBlur}
              />
            </Grid>
          </>
        )}
      </Stack>
    </form>
  );
}

export { FinancialOperationsFormUI };
