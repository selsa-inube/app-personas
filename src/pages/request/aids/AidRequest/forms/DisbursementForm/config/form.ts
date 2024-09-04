import { ISelectOption } from "@design/input/Select/types";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { bankDM } from "src/model/domains/general/bankDM";
import { accountOriginTypeDM } from "src/model/domains/general/accountOriginTypeDM";

const getCommonFields = {
  account: (options: ISelectOption[]): IFormField => ({
    name: "account",
    type: "select",
    label: "Número de cuenta",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readOnly: options.length === 1,
  }),
  disbursedAccount: (options: ISelectOption[]): IFormField => ({
    name: "disbursedAccount",
    type: "select",
    label: "Cuenta",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  bankEntity: (options: ISelectOption[], readOnly?: boolean): IFormField => ({
    name: "bankEntity",
    type: "select",
    label: "Entidad bancaria",
    placeholder: "Seleccione una opción",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readOnly,
  }),
  accountType: (options: ISelectOption[], readOnly?: boolean): IFormField => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: "Seleccione una opción",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readOnly,
  }),
  accountNumberTextField: (readOnly?: boolean): IFormField => ({
    name: "accountNumberTextField",
    type: "text",
    label: "Numero de cuenta",
    placeholder: "Digita el número de cuenta",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.accountNumber.required(
      validationMessages.required,
    ),
    readOnly,
  }),
};

const structureDisbursementForm = (
  formik: FormikValues,
  savingOptions: ISelectOption[],
): IFormStructure => {
  return {
    disbursementMethod: {
      creditToInternalAccount: [getCommonFields.account(savingOptions)],
      transferToExternalAccount: [
        getCommonFields.disbursedAccount(accountOriginTypeDM.options),
        ...(formik.values.disbursedAccount !== undefined
          ? formik.values.disbursedAccount === accountOriginTypeDM.REGISTERED.id
            ? [
                getCommonFields.bankEntity(bankDM.options, true),
                getCommonFields.accountType(accountTypeDM.options, true),
                getCommonFields.accountNumberTextField(true),
              ]
            : [
                getCommonFields.bankEntity(bankDM.options),
                getCommonFields.accountType(accountTypeDM.options),
                getCommonFields.accountNumberTextField(),
              ]
          : []),
      ],
    },
  };
};

export { structureDisbursementForm };
