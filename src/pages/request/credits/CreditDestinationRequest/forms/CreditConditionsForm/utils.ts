import { ISelectOption } from "@design/input/Select/types";
import { FormikProps } from "formik";
import { getPaymentMethodsForProduct } from "src/services/iclient/credits/getPaymentMethodsForProduct";
import { getPeriodicitiesForProduct } from "src/services/iclient/credits/getPeriodicitiesForProduct";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ICreditConditionsEntry } from "./types";

const validationSchema = Yup.object({
  amount: validationRules.money.required(validationMessages.required),
  deadlineTerm: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
  quota: validationRules.money,
  interestRate: Yup.number(),
  anticipatedInterest: Yup.number(),
  netValue: Yup.number(),
  hasResult: Yup.boolean(),
});

const getInitialCreditContidionValidations = (
  formik: FormikProps<ICreditConditionsEntry>,
) => {
  const maxDeadline = formik.values.product.maxAmount;
  const withRecommendation =
    formik.values.product.id === "generateRecommendation";

  return validationSchema.concat(
    Yup.object({
      deadlineTerm: Yup.number()
        .min(1, validationMessages.minNumbers(10))
        .max(
          formik.values.product.maxDeadline || 0,
          `El plazo máximo para este producto es de ${formik.values.product.maxDeadline} meses`,
        ),
      amount: Yup.number()
        .min(1, validationMessages.minCurrencyNumbers(1))
        .max(maxDeadline, "Has superado el cupo máximo")
        .required(validationMessages.required),

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
      "transferBankEntity",
      userData.bankTransfersAccount.bankEntity,
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
  getInitialCreditContidionValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
};
