import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset, Grid } from "@inubekit/inubekit";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IPaymentMethodEntry } from "./types";

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  renderFields: IFormField[];
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const { formik, renderFields, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Fieldset legend="Detalles" type="title" size="medium">
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
            isFullWidth
            options={formik.values.paymentMethods}
            onBlur={formik.handleBlur}
            state={getFieldState(formik, "paymentMethodType")}
            readOnly
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
