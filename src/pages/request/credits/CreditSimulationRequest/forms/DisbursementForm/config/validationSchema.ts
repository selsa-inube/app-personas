import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const disbursementCustomValidationSchemas: {
  [key: string]: { [key: string]: Yup.ObjectSchema<any> };
} = {
  disbursementType: {
    localSavingsDeposit: Yup.object({
      accountNumber: Yup.string().required(validationMessages.required),
    }),
    multiplePaymentRecipients: Yup.object({
      observations: Yup.string()
        .min(10, validationMessages.minCharacters(10))
        .required(validationMessages.required),
    }),
    supplierManagerCheck: Yup.object({
      supplier: Yup.string().required(validationMessages.required),
    }),
    thirdPartManagerCheck: Yup.object({
      identificationType: Yup.string().required(validationMessages.required),
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
        .min(10, validationMessages.minCharacters(10))
        .required(validationMessages.required),
    }),
    ownAccountTransfer: Yup.object({
      account: Yup.string().required(validationMessages.required),
    }),
    supplierExternalTransfer: Yup.object({
      supplier: Yup.string().required(validationMessages.required),
      entity: Yup.string().required(validationMessages.required),
      accountType: Yup.string().required(validationMessages.required),
      accountNumber: Yup.string()
        .required(validationMessages.required)
        .min(5, validationMessages.minNumbers(5)),
    }),
    thirdPartExternalTransfer: Yup.object({
      identificationType: Yup.string().required(validationMessages.required),
      identification: Yup.string().required(validationMessages.required),
      entity: Yup.string().required(validationMessages.required),
      accountType: Yup.string().required(validationMessages.required),
      accountNumber: Yup.string()
        .required(validationMessages.required)
        .min(5, validationMessages.minNumbers(5)),
    }),
  },
  identificationType: {
    [identificationTypeDM.NIT.id]: Yup.object({
      identification: validationRules.identification.required(
        validationMessages.required
      ),
      socialReason: Yup.string().required(validationMessages.required),
    }),
    [identificationTypeDM.CC.id]: Yup.object({
      identification: validationRules.identification.required(
        validationMessages.required
      ),
      firstName: validationRules.name.required(validationMessages.required),
      secondName: validationRules.name.required(validationMessages.required),
      firstLastName: validationRules.name.required(validationMessages.required),
      secondLastName: validationRules.name.required(
        validationMessages.required
      ),
      gender: Yup.string().required(validationMessages.required),
    }),
    [identificationTypeDM.CE.id]: Yup.object({
      identification: validationRules.identification.required(
        validationMessages.required
      ),
      firstName: validationRules.name.required(validationMessages.required),
      secondName: validationRules.name.required(validationMessages.required),
      firstLastName: validationRules.name.required(validationMessages.required),
      secondLastName: validationRules.name.required(
        validationMessages.required
      ),
      gender: Yup.string().required(validationMessages.required),
    }),
    [identificationTypeDM.PA.id]: Yup.object({
      identification: validationRules.identification.required(
        validationMessages.required
      ),
      firstName: validationRules.name.required(validationMessages.required),
      secondName: validationRules.name.required(validationMessages.required),
      firstLastName: validationRules.name.required(validationMessages.required),
      secondLastName: validationRules.name.required(
        validationMessages.required
      ),
      gender: Yup.string().required(validationMessages.required),
    }),
  },
};

export { disbursementCustomValidationSchemas };
