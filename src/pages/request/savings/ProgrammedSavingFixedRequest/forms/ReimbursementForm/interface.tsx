import { Select } from "@design/input/Select";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { buildReimbursementAccount, filteredFormReimbursement } from "./utils";

interface ReimbursementFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function ReimbursementFormUI(props: ReimbursementFormUIProps) {
  const { formik, loading, customHandleBlur, customHandleChange } = props;

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
          options={filteredFormReimbursement()}
          onChange={formik.handleChange}
          onBlur={customHandleBlur}
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
          onChange={formik.handleChange}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "accountReimbursement")}
          readOnly={buildReimbursementAccount(formik).length == 1}
        />
      </Stack>
    </form>
  );
}

export { ReimbursementFormUI };
