import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IFormField } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import { ISelectOption } from "@design/input/Select/types";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";

interface QuotaFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  renderFields: IFormField[];
  savingOptions: ISelectOption[];
  customHandleAccount: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}
const paymentMethodDM = getDomainById("paymentMethod");

function QuotaFormUI(props: QuotaFormUIProps) {
  const {
    formik,
    loading,
    renderFields,
    savingOptions,
    customHandleAccount,
    customHandleChange,
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
              formik.handleBlur,
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
                onBlur={formik.handleBlur}
                onClick={formik.handleClick}
                onFocus={formik.handleFocus}
                onChange={formik.handleChange}
                readOnly={savingOptions.length < 1}
                isDisabled={loading}
                isFullWidth
              />

              {formik.values.accountToDebit === "externalOwnAccountDebit" ? (
                <>
                  <Select
                    label="Tipo de cuenta"
                    name="accountType"
                    id="accountType"
                    value={formik.values.accountType}
                    size="compact"
                    options={getDomainById("accountType")}
                    state={getFieldState(formik, "accountType")}
                    errorMessage={formik.errors.accountType}
                    onBlur={formik.handleBlur}
                    onClick={formik.handleClick}
                    onFocus={formik.handleFocus}
                    onChange={formik.handleChange}
                    isDisabled={loading}
                    isFullWidth
                  />
                  <Select
                    label="Entidad bancaria"
                    name="bankEntity"
                    id="bankEntity"
                    value={formik.values.bankEntity}
                    size="compact"
                    options={getDomainById("bank")}
                    state={getFieldState(formik, "bankEntity")}
                    errorMessage={formik.errors.bankEntity}
                    onBlur={formik.handleBlur}
                    onClick={formik.handleClick}
                    onFocus={formik.handleFocus}
                    onChange={formik.handleChange}
                    isDisabled={loading}
                    isFullWidth
                  />
                  <TextField
                    label="Numero de cuenta"
                    placeholder={
                      savingOptions.length === 1 ||
                      !formik.values.accountToDebit
                        ? ""
                        : "Digita el número de cuenta"
                    }
                    name="accountNumber"
                    id="accountNumber"
                    type="number"
                    value={formik.values.accountNumber}
                    errorMessage={formik.errors.accountNumber}
                    isDisabled={loading}
                    size="compact"
                    isFullWidth
                    state={getFieldState(formik, "accountNumber")}
                    onBlur={formik.handleBlur}
                    onFocus={formik.handleFocus}
                    onChange={formik.handleChange}
                    validMessage="El numero de cuenta es válido"
                    readOnly={
                      savingOptions.length === 1 ||
                      !formik.values.accountToDebit
                    }
                  />
                </>
              ) : (
                <Select
                  label="Numero de cuenta"
                  name="accountNumber"
                  id="accountNumber"
                  placeholder={
                    savingOptions.length === 1 || !formik.values.accountToDebit
                      ? ""
                      : "Digita el número de cuenta"
                  }
                  value={formik.values.accountNumber}
                  size="compact"
                  options={savingOptions}
                  state={getFieldState(formik, "accountNumber")}
                  errorMessage={formik.errors.accountNumber}
                  onBlur={formik.handleBlur}
                  onClick={formik.handleClick}
                  onFocus={formik.handleFocus}
                  onChange={customHandleAccount}
                  readOnly={
                    savingOptions.length === 1 || !formik.values.accountToDebit
                  }
                  isDisabled={loading}
                  isFullWidth
                  isRequired
                />
              )}
            </>
          )}
        </Grid>
      </Stack>
    </form>
  );
}

export { QuotaFormUI };
