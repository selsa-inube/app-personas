import * as Yup from "yup";
import { validationMessages } from "src/validations/validationMessages";

const disbursementCustomValidationSchemas: {
  [key: string]: { [key: string]: Yup.ObjectSchema<any> };
} = {
  creditDisbursement: {
    localSavingsDeposit: Yup.object({
      accountNumber: Yup.string().required(validationMessages.required),
    }),
    multiplePaymentRecipients: Yup.object({
      observations: Yup.string()
        .required(validationMessages.required)
        .min(10, validationMessages.minCharacters(10)),
    }),
    supplierManagerCheck: Yup.object({
      supplier: Yup.string().required(validationMessages.required),
    }),
    thirdPartManagerCheck: Yup.object({
      identificationType: Yup.string().required(validationMessages.required),
      identification: Yup.string().required(validationMessages.required),
    }),
    supplierPayeeCheck: Yup.object({
      supplier: Yup.string().required(validationMessages.required),
    }),
    thirdPartPayeeCheck: Yup.object({
      identificationType: Yup.string().required(validationMessages.required),
      identification: Yup.string().required(validationMessages.required),
    }),
    others: Yup.object({
      observations: Yup.string()
        .required(validationMessages.required)
        .min(10, validationMessages.minCharacters(10)),
    }),
    ownAccountTransfer: Yup.object({
      account: Yup.string().required(validationMessages.required),
    }),
    supplierExternalTransfer: Yup.object({
      supplier: Yup.string().required(validationMessages.required),
      entity: Yup.string().required(validationMessages.required),
      accountType: Yup.string().required(validationMessages.required),
      accountNumber: Yup.string().required(validationMessages.required)
      .min(5, validationMessages.minNumbers(5)),
    }),
    thirdPartExternalTransfer: Yup.object({
      identificationType: Yup.string().required(validationMessages.required),
      identification: Yup.string().required(validationMessages.required),
      entity: Yup.string().required(validationMessages.required),
      accountType: Yup.string().required(validationMessages.required),
      accountNumber: Yup.string().required(validationMessages.required)
      .min(5, validationMessages.minNumbers(5)),
    }),
  },
};

export { disbursementCustomValidationSchemas };
