import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset, Grid, Select, Stack } from "@inubekit/inubekit";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { generateFormFields } from "src/utils/forms/forms";
import { IPaymentMethodEntry } from "./types";

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  loading?: boolean;
  renderFields: IFormField[];
  customHandleChange: (name: string, value: string) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const { formik, loading, renderFields, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        direction="column"
      >
        <Fieldset legend="Detalles">
          <Grid
            templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
            width="100%"
          >
            <Select
              label="Formas de pago"
              name="paymentMethod"
              id="paymentMethod"
              size="compact"
              fullwidth
              placeholder="Seleccionar una opción"
              options={formik.values.paymentMethods || []}
              onBlur={formik.handleBlur}
              onChange={customHandleChange}
              value={formik.values.paymentMethod || ""}
              disabled={formik.values.paymentMethods.length === 1}
              required
            />

            {generateFormFields(
              renderFields,
              formik,
              formik.handleBlur,
              customHandleChange,
              isTablet,
              loading,
            )}
          </Grid>
        </Fieldset>
      </Stack>
    </form>
  );
}

export { PaymentMethodFormUI };
