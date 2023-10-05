import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { activeDM } from "src/model/domains/general/activedm";

interface FinancialOperationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const mquery = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
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
          handleBlur={formik.handleBlur}
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
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.hasForeignCurrencyAccounts}
          isDisabled={loading}
          state={stateValue("hasForeignCurrencyAccounts")}
          handleChange={formik.handleChange}
          isRequired
        />
      </Grid>
    </form>
  );
}

export { FinancialOperationsFormUI };
