import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IFormField } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";

interface QuotaFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  renderFields: IFormField[];
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}
const paymentMethodDM = getDomainById("paymentMethod");

function QuotaFormUI(props: QuotaFormUIProps) {
  const { formik, loading, renderFields, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Grid
          gap={inube.spacing.s300}
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
        >
          <TextField
            label="Valor periódico del ahorro"
            placeholder="Ingresa el valor a ahorrar"
            name="periodicValue"
            id="periodicValue"
            value={validateCurrencyField("periodicValue", formik)}
            type="text"
            iconAfter={<MdOutlineAttachMoney size={18} />}
            errorMessage={formik.errors.periodicValue}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "periodicValue")}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleChangeWithCurrency(formik, e);
            }}
            validMessage="El valor es válido"
            isRequired
          />
          <Select
            label="Medio de pago"
            name="paymentMethod"
            id="paymentMethod"
            value={formik.values.paymentMethod}
            options={paymentMethodDM}
            isDisabled={loading}
            size="compact"
            onChange={customHandleChange}
            onBlur={formik.handleBlur}
            state={getFieldState(formik, "paymentMethod")}
            errorMessage={formik.errors.paymentMethod}
            isFullWidth
            isRequired
          />
        </Grid>

        <Grid
          gap={inube.spacing.s300}
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
        >
          {!formik.values.paymentMethod ? (
            <TextField
              label="Periodicidad"
              placeholder=""
              name="periodicity"
              id="periodicity"
              value={formik.values.periodicity}
              isDisabled={loading}
              size="compact"
              isFullWidth
              readOnly
            />
          ) : (
            generateFormFields(
              renderFields,
              formik,
              formik.handleBlur,
              customHandleChange,
              isTablet,
              loading,
            )
          )}
        </Grid>
      </Stack>
    </form>
  );
}

export { QuotaFormUI };
