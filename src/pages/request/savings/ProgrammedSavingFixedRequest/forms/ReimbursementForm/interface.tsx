import { Select } from "@design/input/Select";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import {
  buildReimbursementAccount,
  filteredOptionsFormReimbursement,
} from "./utils";

interface ReimbursementFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

function ReimbursementFormUI(props: ReimbursementFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Select
          name="reimbursementType"
          id="reimbursementType"
          label="Forma de reembolso"
          placeholder="Selecciona una opción"
          value={formik.values.reimbursementType}
          size="compact"
          isDisabled={loading}
          options={filteredOptionsFormReimbursement()}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          state={getFieldState(formik, "reimbursementType")}
          errorMessage={formik.errors.reimbursementType}
          isFullWidth
        />

        <Select
          name="accountReimbursement"
          id="accountReimbursement"
          label="Cuenta"
          placeholder="Selecciona una opción"
          value={formik.values.accountReimbursement}
          options={buildReimbursementAccount(formik)}
          errorMessage={formik.errors.accountReimbursement}
          onChange={customHandleChange}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "accountReimbursement")}
          readOnly={
            buildReimbursementAccount(formik) &&
            buildReimbursementAccount(formik)?.length == 1
              ? true
              : false
          }
        />
      </Stack>
    </form>
  );
}

export { ReimbursementFormUI };
