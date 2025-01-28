import { IOption } from "@inubekit/inubekit";
import { accountSelectionTypeData } from "@mocks/domains/accountSelectionType";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { IPaymentMethodEntry } from "../types";

const getCommonFields = {
  accountToDebit: (options: IOption[]): IFormField => ({
    name: "accountToDebit",
    type: "select",
    label: "Cuenta a debitar",
    size: "compact",
    options: options,
    fullwidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),

  accountSelection: (options: IOption[], readonly: boolean): IFormField => ({
    name: "accountSelection",
    type: "select",
    label: "Selección de cuenta",
    size: "compact",
    options: options,
    fullwidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readonly,
  }),

  accountNumberSelect: (
    formik: FormikProps<IPaymentMethodEntry>,
    savingOptions: IOption[],
    readonly?: boolean,
  ): IFormField => ({
    name: "accountNumberSelect",
    type: "select",
    label: "Numero de cuenta",
    placeholder:
      savingOptions.length === 1 || !formik.values.accountToDebit
        ? ""
        : "Selecciona el número de cuenta",
    size: "compact",
    options: savingOptions,
    fullwidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    required: true,
    readonly,
  }),

  accountType: (options: IOption[], readonly?: boolean): IFormField => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: readonly ? "" : "Seleccione una opción",
    size: "compact",
    options: options,
    fullwidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readonly,
  }),

  bankEntity: (options: IOption[], readonly?: boolean): IFormField => ({
    name: "bankEntity",
    type: "select",
    label: "Entidad bancaria",
    placeholder: readonly ? "" : "Seleccione una opción",
    size: "compact",
    options: options,
    fullwidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readonly,
  }),

  accountNumberTextField: (readonly?: boolean): IFormField => ({
    name: "accountNumberTextField",
    type: "text",
    label: "Numero de cuenta",
    placeholder: readonly ? "" : "Digita el número de cuenta",
    size: "compact",
    fullwidth: true,
    gridColumn: "span 1",
    validMessage: "El Numero de cuenta es válido",
    validation: validationRules.accountNumber.required(
      validationMessages.required,
    ),
    readonly,
  }),
};

const structurePaymentMethodForm = (
  formik: FormikProps<IPaymentMethodEntry>,
  savingOptions: IOption[],
): IFormStructure => {
  const getCommonFieldsForAccountDebit = (isExternal: boolean) => {
    const commonFields = [
      getCommonFields.accountToDebit(getDomainById("accountDebitType")),
    ];

    if (isExternal) {
      commonFields.push(
        getCommonFields.accountSelection(
          accountSelectionTypeData.map((accountType) => ({
            value: accountType.id,
            id: accountType.id,
            label: accountType.value,
          })),
          formik.values.accountToDebit === undefined,
        ),
        getCommonFields.accountNumberTextField(
          formik.values.accountSelection === undefined,
        ),
        getCommonFields.accountType(
          getDomainById("accountType"),
          formik.values.accountSelection === undefined,
        ),
        getCommonFields.bankEntity(
          getDomainById("bank"),
          formik.values.accountSelection === undefined,
        ),
      );
    } else {
      commonFields.push(
        getCommonFields.accountNumberSelect(
          formik,
          savingOptions,
          formik.values.accountToDebit === undefined,
        ),
      );
    }

    return commonFields;
  };

  return {
    paymentMethodType: {
      7: [],
      8: [],
      25: [],
      30: [],
      61: [],
      62: [],
      CO: [],
      D1: getCommonFieldsForAccountDebit(
        formik.values.accountToDebit === "externalOwnAccountDebit",
      ),
      E1: getCommonFieldsForAccountDebit(
        formik.values.accountToDebit === "externalOwnAccountDebit",
      ),
      E2: getCommonFieldsForAccountDebit(
        formik.values.accountToDebit === "externalOwnAccountDebit",
      ),
      E3: getCommonFieldsForAccountDebit(
        formik.values.accountToDebit === "externalOwnAccountDebit",
      ),
    },
  };
};

export { structurePaymentMethodForm };
