import { Select } from "@design/input/Select";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { ISelectOption } from "@design/input/Select/types";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface RefundFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  accountOptions: ISelectOption[];
  savingOptions: ISelectOption[];
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  customHandleRefundMethod: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  customHandleAccount: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function RefundFormUI(props: RefundFormUIProps) {
  const {
    formik,
    loading,
    accountOptions,
    savingOptions,
    customHandleRefundMethod,
    customHandleAccount,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
      >
        <Select
          label="Forma de reembolso"
          name="refundMethod"
          id="refundMethod"
          value={formik.values.refundMethod}
          size="compact"
          options={getDomainById("refundMethod")}
          state={getFieldState(formik, "refundMethod")}
          errorMessage={formik.errors.refundMethod}
          onBlur={formik.handleBlur}
          onClick={formik.handleClick}
          onFocus={formik.handleFocus}
          onChange={customHandleRefundMethod}
          readOnly={savingOptions.length < 1}
          isDisabled={loading}
          isFullWidth
        />
        <Select
          label="Cuenta"
          name="account"
          id="account"
          value={formik.values.account}
          size="compact"
          options={accountOptions}
          state={getFieldState(formik, "account")}
          errorMessage={formik.errors.account}
          onBlur={formik.handleBlur}
          onClick={formik.handleClick}
          onFocus={formik.handleFocus}
          onChange={customHandleAccount}
          readOnly={savingOptions.length === 1 || accountOptions.length === 1}
          isDisabled={loading}
          isFullWidth
        />
      </Stack>
    </form>
  );
}

export { RefundFormUI };
