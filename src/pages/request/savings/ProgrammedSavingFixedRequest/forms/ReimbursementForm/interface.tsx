import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { getDomainById } from "@mocks/domains/domainService.mocks";

const reimbursementTypeDM = getDomainById("reimbursementType");

const formReimbursement = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  return reimbursementTypeDM.find(
    (reimbursementType) => reimbursementType.id === valueReimbursement
  )?.description;
};

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

  const isTablet = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Select
          name="reimbursementType"
          id="reimbursementType"
          label="Forma de desembolso"
          value={formik.values.reimbursementType}
          size="compact"
          isDisabled={loading}
          options={reimbursementTypeDM}
          onChange={customHandleChange}
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
          value={formReimbursement(formik)}
          type="text"
          errorMessage={formik.errors.accountReimbursement}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "accountReimbursement")}
          onBlur={formik.handleBlur}
          onChange={customHandleChange}
          validMessage="El valor comercial es válido"
          isRequired
          readOnly
        />
      </Stack>
    </form>
  );
}

export { ReimbursementFormUI };
