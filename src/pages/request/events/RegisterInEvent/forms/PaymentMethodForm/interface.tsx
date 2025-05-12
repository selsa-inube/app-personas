import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset, Grid, Select, Stack, Text } from "@inubekit/inubekit";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { generateFormFields } from "src/utils/forms/forms";
import { IPaymentMethodEntry } from "./types";

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  loading?: boolean;
  renderFields: IFormField[];
  noRequirePaymentMethod?: boolean;
  customHandleChange: (name: string, value: string) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const {
    formik,
    loading,
    renderFields,
    noRequirePaymentMethod,
    customHandleChange,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  if (noRequirePaymentMethod) {
    return (
      <Text type="label" size="large" appearance="gray">
        Actualmente este evento no requiere forma de pago. Puedes continuar con
        el siguiente paso de navegación.
      </Text>
    );
  }

  return (
    <form>
      <Stack
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        direction="column"
      >
        <Fieldset
          legend="Detalles"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
            width="100%"
          >
            <Select
              label="Medio de pago"
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
