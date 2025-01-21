import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IInterestPaymentEntry } from "./types";

interface InterestPaymentFormUIProps {
  formik: FormikProps<IInterestPaymentEntry>;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

function InterestPaymentFormUI(props: InterestPaymentFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        gap={inube.spacing.s300}
      >
        <Select
          label="Pago de intereses"
          name="interestPayment"
          id="interestPayment"
          value={formik.values.interestPayment || ""}
          size="compact"
          isFullWidth
          options={formik.values.interestPayments || []}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.interestPayment}
          isDisabled={loading}
          state={getFieldState(formik, "interestPayment")}
          onChange={customHandleChange}
          isRequired
          readOnly={formik.values.interestPayments?.length === 1}
        />
      </Grid>
    </form>
  );
}

export { InterestPaymentFormUI };
