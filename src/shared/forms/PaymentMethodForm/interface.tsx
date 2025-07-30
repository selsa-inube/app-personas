import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset, Grid, Select } from "@inubekit/inubekit";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import {
  formikHandleChange,
  generateFormFields,
  isInvalid,
} from "src/utils/forms/forms";
import { IPaymentMethodEntry } from "./types";

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  renderFields: IFormField[];
  customHandleChange: (name: string, value: string) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const { formik, renderFields, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Fieldset legend="Detalles">
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
          width="100%"
        >
          <Select
            id="paymentMethodType"
            name="paymentMethodType"
            label="Medio de pago"
            value={formik.values.paymentMethodType}
            size="compact"
            fullwidth
            options={formik.values.paymentMethods}
            onBlur={formik.handleBlur}
            invalid={isInvalid(formik, "paymentMethodType")}
            disabled={formik.values.paymentMethods.length === 1}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
          />
          {generateFormFields(
            renderFields,
            formik,
            formik.handleBlur,
            customHandleChange,
          )}
        </Grid>
      </Fieldset>
    </form>
  );
}

export { PaymentMethodFormUI };
