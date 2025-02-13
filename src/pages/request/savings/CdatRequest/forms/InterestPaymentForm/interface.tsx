import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Select } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { isInvalid } from "src/utils/forms/forms";
import { IInterestPaymentEntry } from "./types";

interface InterestPaymentFormUIProps {
  formik: FormikProps<IInterestPaymentEntry>;
  loading?: boolean;
  customHandleChange: (name: string, value: string) => void;
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
          fullwidth
          options={formik.values.interestPayments || []}
          onBlur={formik.handleBlur}
          message={formik.errors.interestPayment}
          disabled={formik.values.interestPayments?.length === 1 || loading}
          invalid={isInvalid(formik, "interestPayment")}
          onChange={customHandleChange}
          required
        />
      </Grid>
    </form>
  );
}

export { InterestPaymentFormUI };
