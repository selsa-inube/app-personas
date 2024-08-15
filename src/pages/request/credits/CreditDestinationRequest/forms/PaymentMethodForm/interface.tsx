import { FormikProps } from "formik";
import { IPaymentMethodEntry } from "./types";
import { Fieldset } from "@design/input/Fieldset";
import { Grid } from "@inubekit/grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { inube } from "@design/tokens";
import { Select } from "@design/input/Select";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IFormField } from "@ptypes/forms.types";

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
      <Fieldset title="Detalles">
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
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
