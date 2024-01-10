import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IFormField } from "@ptypes/forms.types";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { Stack } from "@design/layout/Stack";

interface QuotaFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  renderFields: IFormField[];
}
const paymentMethodDM = getDomainById("paymentMethod");

function QuotaFormUI(props: QuotaFormUIProps) {
  const {
    formik,
    loading,
    customHandleChange,
    customHandleBlur,
    renderFields,
  } = props;

  const isTablet = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Grid gap="s300" templateColumns={isTablet ? "1fr" : "repeat(2, 1fr)"}>
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
            onBlur={customHandleBlur}
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
            onBlur={customHandleBlur}
            state={getFieldState(formik, "paymentMethod")}
            errorMessage={formik.errors.paymentMethod}
            isFullWidth
            isRequired
          />
        </Grid>

        <Grid gap="s300" templateColumns={isTablet ? "1fr" : "repeat(2, 1fr)"}>
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
              customHandleBlur,
              customHandleChange,
              isTablet,
              loading
            )
          )}
        </Grid>
      </Stack>
    </form>
  );
}

export { QuotaFormUI };
