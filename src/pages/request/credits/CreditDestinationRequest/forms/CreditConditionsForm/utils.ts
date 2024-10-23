import { ISelectOption } from "@design/input/Select/types";
import { FormikProps } from "formik";
import { getPaymentMethodsForProduct } from "src/services/iclient/credits/getPaymentMethods";
import { getPeriodicitiesForProduct } from "src/services/iclient/credits/getPeriodicities";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ICreditConditionsEntry } from "./types";

const validationSchema = Yup.object({
  amount: validationRules.money.required(validationMessages.required),
  deadline: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
  paymentMethod: Yup.object().required(validationMessages.required),
  periodicity: Yup.object().required(validationMessages.required),
  quota: validationRules.money,
  rate: Yup.number(),
  anticipatedInterest: Yup.number(),
  netValue: Yup.number(),
  hasResult: Yup.boolean(),
});

const getInitialCreditConditionValidations = (
  formik: FormikProps<ICreditConditionsEntry>,
) => {
  const maxDeadline = formik.values.product.maxDeadline;
  const maxAmount = formik.values.product.maxAmount;
  const minAmount = formik.values.product.minAmount;
  const maxAmountForUser = formik.values.product.maxAmountForUser;
  const withRecommendation =
    formik.values.product.id === "generateRecommendation";

  return validationSchema.concat(
    Yup.object({
      deadline: Yup.number()
        .min(1, validationMessages.minNumbers(10))
        .max(
          maxDeadline || 0,
          `El plazo máximo para este producto es de ${maxDeadline} meses`,
        ),
      amount: Yup.number()
        .min(minAmount, `El monto mínimo es de ${currencyFormat(minAmount)}`)
        .max(
          maxAmountForUser < maxAmount ? maxAmountForUser : maxAmount,
          "Has superado el cupo máximo",
        )
        .required(validationMessages.required),

      paymentMethod: Yup.object().required(validationMessages.required),
      periodicity: Yup.object().required(validationMessages.required),

      netValue: withRecommendation
        ? Yup.number()
        : Yup.number().required(validationMessages.required),
      hasResult: withRecommendation
        ? Yup.boolean()
        : Yup.boolean()
            .required(validationMessages.required)
            .test((value) => value === true),
    }),
  );
};

const getPeriodicities = async (
  formik: FormikProps<ICreditConditionsEntry>,
  accessToken: string,
  paymentMethodId: string,
) => {
  const periodicities = await getPeriodicitiesForProduct(
    accessToken,
    formik.values.product.id,
    paymentMethodId,
  );
  formik.setFieldValue("periodicities", periodicities);

  if (periodicities.length === 1) {
    formik.setFieldValue("periodicity", periodicities[0]);
  }
};

const getValuesForSimulate = async (
  formik: FormikProps<ICreditConditionsEntry>,
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
  } else {
    const paymentMethods = await getPaymentMethodsForProduct(
      userIdentification,
      accessToken,
      formik.values.product.id,
    );
    newPaymentMethods.push(...paymentMethods);
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
  getInitialCreditConditionValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
};
