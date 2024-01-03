import { Select } from "@design/input/Select";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";

interface RefundFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onRefundMethodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function RefundFormUI(props: RefundFormUIProps) {
  const { formik, loading, customHandleBlur, onRefundMethodChange } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <form>
      <Stack direction="column" gap={isMobile ? "s150" : "s300"}>
        <Select
          label="Forma de reembolso"
          name="refundMethod"
          id="refundMethod"
          value={formik.values.refundMethod}
          size="compact"
          options={getDomainById("refundMethod")}
          state={getFieldState(formik, "refundMethod")}
          errorMessage={formik.errors.refundMethod}
          onBlur={customHandleBlur}
          onClick={formik.handleClick}
          onFocus={formik.handleFocus}
          onChange={onRefundMethodChange}
          isDisabled={loading}
          isFullWidth
        />
        <Select
          label="Cuenta"
          name="account"
          id="account"
          size="compact"
          options={getDomainById("refundAccount")}
          value={formik.values.account}
          onChange={formik.handleChange}
          isDisabled={loading}
          readOnly
          isFullWidth
        />
      </Stack>
    </form>
  );
}

export { RefundFormUI };
