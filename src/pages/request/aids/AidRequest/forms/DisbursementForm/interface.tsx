import { Select } from "@design/input/Select";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { IProduct } from "src/model/entity/product";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IDisbursementEntry } from "./types";
import { getDisbursementMethodOptions } from "./utils";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";
import { IFormField } from "@ptypes/forms.types";

interface DisbursementFormUIProps {
  formik: FormikProps<IDisbursementEntry>;
  savingAccounts: IProduct[];
  renderFields: IFormField[];
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const { formik, savingAccounts, renderFields, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 3}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s200}
      >
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

        {generateFormFields(
          renderFields,
          formik,
          formik.handleBlur,
          customHandleChange,
        )}
      </Grid>
    </form>
  );
}

export { DisbursementFormUI };
