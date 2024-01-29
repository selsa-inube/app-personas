import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IFormField } from "@ptypes/forms.types";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ISelectOption } from "@design/input/Select/types";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { Stack } from "@design/layout/Stack";

interface QuotaFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  renderFields: IFormField[];
  accountOptions: ISelectOption[];
  savingOptions: ISelectOption[];
  customHandleAccountToDebit: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  customHandleAccount: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}
const paymentMethodDM = getDomainById("paymentMethod");

function QuotaFormUI(props: QuotaFormUIProps) {
  const {
    formik,
    loading,
    renderFields,
    accountOptions,
    savingOptions,
    customHandleAccountToDebit,
    customHandleAccount,
    customHandleChange,
    customHandleBlur,
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
              loading,
            )
          )}
          {formik.values.paymentMethod === "automaticDebit" && (
            <>
              <Select
                label="Cuenta a debitar"
                name="accountToDebit"
                id="accountToDebit"
                value={formik.values.accountToDebit}
                size="compact"
                options={getDomainById("accountDebitType")}
                state={getFieldState(formik, "accountToDebit")}
                errorMessage={formik.errors.accountToDebit}
                onBlur={customHandleBlur}
                onClick={formik.handleClick}
                onFocus={formik.handleFocus}
                onChange={customHandleAccountToDebit}
                readOnly={savingOptions.length < 1}
                isDisabled={loading}
                isFullWidth
              />
              <Select
                label="Numero de cuenta"
                name="accountNumber"
                id="accountNumber"
                value={formik.values.accountNumber}
                size="compact"
                options={accountOptions}
                state={getFieldState(formik, "accountNumber")}
                errorMessage={formik.errors.accountNumber}
                onBlur={customHandleBlur}
                onClick={formik.handleClick}
                onFocus={formik.handleFocus}
                onChange={customHandleAccount}
                readOnly={
                  savingOptions.length === 1 || accountOptions.length === 1
                }
                isDisabled={loading}
                isFullWidth
                isRequired
              />
            </>
          )}
        </Grid>
      </Stack>
    </form>
  );
}

export { QuotaFormUI };
