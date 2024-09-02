import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IReimbursementEntry } from "./types";
import {
  buildReimbursementAccount,
  filteredOptionsFormReimbursement,
} from "./utils";

interface ReimbursementFormUIProps {
  formik: FormikProps<IReimbursementEntry>;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

function ReimbursementFormUI(props: ReimbursementFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
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
          }
        />
      </Stack>
    </form>
  );
}

export { ReimbursementFormUI };
