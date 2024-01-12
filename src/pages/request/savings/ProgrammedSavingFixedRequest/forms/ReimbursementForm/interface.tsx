import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { buildReimbursementAccount, reimbursementTypeDM } from "./utils";

interface ReimbursementFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function ReimbursementFormUI(props: ReimbursementFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

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
          options={reimbursementTypeDM}
          onChange={formik.handleChange}
          onBlur={customHandleBlur}
          state={getFieldState(formik, "reimbursementType")}
          errorMessage={formik.errors.reimbursementType}
          isFullWidth
        />

        <TextField
          name="accountReimbursement"
          id="accountReimbursement"
          label="Cuenta"
          placeholder=""
          value={
            (formik.values.accountReimbursement =
              buildReimbursementAccount(formik))
          }
          type="text"
          errorMessage={formik.errors.accountReimbursement}
          onChange={formik.handleChange}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "accountReimbursement")}
          validMessage="El valor comercial es válido"
          readOnly
        />
      </Stack>
    </form>
  );
}

export { ReimbursementFormUI };
