import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { generateFormFields, getFieldState } from "src/utils/forms";
import { IFormField } from "@ptypes/forms.types";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/formats";

interface QuotaFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  renderFields: IFormField[];
}

function QuotaFormUI(props: QuotaFormUIProps) {
  const {
    formik,
    loading,
    customHandleChange,
    customHandleBlur,
    renderFields,
  } = props;

  const isTablet = useMediaQuery("(max-width: 750px)");

  const paymentMethodDM = getDomainById("paymentMethod");

  return (
    <form>
      <Grid gap="s300" templateColumns={isTablet ? "1fr" : "1fr 1fr"}>
        <TextField
          label="Valor periódico del ahorro"
          placeholder="Ingresa el valor a ahorrar"
          name="PeriodicValue"
          id="PeriodicValue"
          value={validateCurrencyField("PeriodicValue", formik)}
          type="text"
          iconAfter={<MdOutlineAttachMoney size={18} />}
          errorMessage={formik.errors.PeriodicValue}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "PeriodicValue")}
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

        {!formik.values.paymentMethod ? (
          <TextField
            label="Periodicidad"
            placeholder=""
            name="Periodicity"
            id="Periodicity"
            value={formik.values.Periodicity}
            isDisabled={loading}
            size="compact"
            isFullWidth
            readOnly
            isRequired
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
    </form>
  );
}

export { QuotaFormUI };
