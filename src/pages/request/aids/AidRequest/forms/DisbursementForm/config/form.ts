import { ISelectOption } from "@design/input/Select/types";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { accountOriginTypeData } from "@mocks/domains/accountOriginType";
import { bankDM } from "src/model/domains/general/bankDM";

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
  bankEntity: (options: ISelectOption[]): IFormField => ({
    name: "bankEntity",
    type: "select",
    label: "Entidad bancaria",
    placeholder: "Seleccione una opción",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  accountType: (options: ISelectOption[]): IFormField => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: "Seleccione una opción",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  accountNumberTextField: (): IFormField => ({
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
        getCommonFields.disbursedAccount(accountOriginTypeData),
        ...(formik.values.disbursedAccount !== undefined
          ? [
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
