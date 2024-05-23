import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import { IProduct } from "src/model/entity/product";
import { getFieldState } from "src/utils/forms/forms";
import { IDisbursementEntry } from "./types";
import { getDisbursementMethodOptions } from "./utils";

interface DisbursementFormUIProps {
  formik: FormikProps<IDisbursementEntry>;
  savingAccounts: IProduct[];
  customHandleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const { formik, savingAccounts, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Grid templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`} gap="s200">
        <Select
          label="Forma de desembolso"
          name="disbursementMethod"
          id="disbursementMethod"
          size="compact"
          isFullWidth
          options={getDisbursementMethodOptions(savingAccounts)}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.disbursementMethod}
          state={getFieldState(formik, "disbursementMethod")}
          onChange={customHandleChange}
          value={formik.values.disbursementMethod}
          isRequired
        />

        <Select
          label="Cuenta"
          name="account"
          id="account"
          size="compact"
          isFullWidth
          options={formik.values.accountOptions}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.account}
          state={getFieldState(formik, "account")}
          onChange={formik.handleChange}
          value={formik.values.account}
          isRequired
          isDisabled={formik.values.accountOptions.length === 1}
        />
      </Grid>
    </form>
  );
}

export { DisbursementFormUI };
