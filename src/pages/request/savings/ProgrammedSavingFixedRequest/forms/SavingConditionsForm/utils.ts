import { ISelectOption } from "@design/input/Select/types";
import { FormikProps } from "formik";
import { getPeriodicitiesForProduct } from "src/services/iclient/credits/getPeriodicities";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ISavingConditionsEntry } from "./types";

const validationSchema = Yup.object({
  quota: Yup.number().required(validationMessages.required),
  deadline: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
  paymentMethod: Yup.object().required(validationMessages.required),
  periodicity: Yup.object().required(validationMessages.required),
  rate: Yup.number(),
  anticipatedInterest: Yup.number(),
  netValue: Yup.number(),
  hasResult: Yup.boolean(),
});

const getInitialSavingConditionsValidations = () =>
  // formik: FormikProps<ISavingConditionsEntry>, // TEMP
  {
    return validationSchema.concat(
      Yup.object({
        quota: Yup.number()
          .min(
            35000,
            `El valor mínimo de la cuota es de ${currencyFormat(35000)}`,
          )
          .max(
            999999999,
            `El valor máximo de la cuota es de ${currencyFormat(35000)}`,
          )
          .required(validationMessages.required),
        deadline: Yup.number()
          .min(6, `El plazo mínimo para este producto es de ${6} meses`)
          .max(60, `El plazo máximo para este producto es de ${60} meses`)
          .required(validationMessages.required),

        paymentMethod: Yup.object().required(validationMessages.required),
        periodicity: Yup.object().required(validationMessages.required),
        netValue: Yup.number().required(validationMessages.required),
        hasResult: Yup.boolean()
          .required(validationMessages.required)
          .test((value) => value === true),
      }),
    );
  };

const getPeriodicities = async (
  formik: FormikProps<ISavingConditionsEntry>,
  accessToken: string,
  paymentMethodId: string,
) => {
  const periodicities = await getPeriodicitiesForProduct(
    accessToken,
    "57", // TEMP
    paymentMethodId,
  );

  formik.setFieldValue("periodicities", periodicities);

  if (periodicities.length === 1) {
    formik.setFieldValue("periodicity", periodicities[0]);
  }
};

const getValuesForSimulate = async (
  formik: FormikProps<ISavingConditionsEntry>,
  accessToken: string,
  userIdentification: string,
) => {
  if (!accessToken) return;

  const userData = await getCustomer(userIdentification, accessToken);

  const newPaymentMethods: ISelectOption[] = [];

  if (userData) {
    if (
      userData.financialOperations &&
      userData.financialOperations.paymentMethod
    ) {
      newPaymentMethods.push(userData.financialOperations.paymentMethod);
    }
    formik.setFieldValue(
      "transferBankEntityCode",
      userData.bankTransfersAccount.bankEntityCode,
    );
    formik.setFieldValue(
      "transferBankEntityName",
      userData.bankTransfersAccount.bankEntityName,
    );
    formik.setFieldValue(
      "transferAccountType",
      userData.bankTransfersAccount.accountType,
    );
    formik.setFieldValue(
      "transferAccountNumber",
      userData.bankTransfersAccount.accountNumber,
    );
  }

  formik.setFieldValue("paymentMethods", newPaymentMethods);

  if (newPaymentMethods.length === 1) {
    formik.setFieldValue("paymentMethod", newPaymentMethods[0]);
  }

  const paymentMethod =
    userData?.financialOperations.paymentMethod || formik.values.paymentMethod;

  if (paymentMethod) {
    await getPeriodicities(formik, accessToken, paymentMethod.id);
  }
};

export {
  getInitialSavingConditionsValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
};
