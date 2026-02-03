import { FormikProps } from "formik";
import { captureNewError } from "src/services/errors/handleErrors";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { getPayrollsForProduct } from "src/services/iclient/productRequest/getPayrolls";
import { getPeriodicitiesForProduct } from "src/services/iclient/productRequest/getPeriodicities";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ISimulateCreditEntry } from "./types";
import { IThird } from "src/model/entity/user";

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

const getInitialSimulateCreditValidations = (
  formik: FormikProps<ISimulateCreditEntry>,
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
  formik: FormikProps<ISimulateCreditEntry>,
  accessToken: string,
  paymentMethodId: string,
) => {
  const periodicities = await getPeriodicitiesForProduct(
    accessToken,
    paymentMethodId,
  );
  formik.setFieldValue("periodicities", periodicities);

  if (periodicities.length === 1) {
    formik.setFieldValue("periodicity", periodicities[0]);
  }
};

const getValuesForSimulate = async (
  formik: FormikProps<ISimulateCreditEntry>,
  accessToken: string,
  userIdentification: string,
) => {
  if (!accessToken) return;
  let userData: IThird | undefined;

  try {
    userData = await getCustomer(userIdentification, accessToken);
  } catch (error) {
    captureNewError(
      error,
      {
        inFunction: "getValuesForSimulate",
        action: "getCustomer",
        screen: "SimulateCreditForm",
        file: "src/pages/request/credits/CreditDestinationRequest/forms/SimulateCreditForm/utils.ts",
      },
      { feature: "request-credit" },
    );
  }

  try {
    let newPaymentMethods = await getPayrollsForProduct(
      "credit",
      formik.values.product.id,
      accessToken,
      userIdentification,
    );

    if (userData) {
      if (
        userData.financialOperations &&
        userData.financialOperations.paymentMethod &&
        newPaymentMethods.length === 0
      ) {
        newPaymentMethods.push(userData.financialOperations.paymentMethod);
      }

      const paymentMethodId = userData.financialOperations?.paymentMethod?.id;

      if (paymentMethodId) {
        newPaymentMethods = newPaymentMethods.filter(
          (method) => method.id === paymentMethodId,
        );
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

      try {
        await getPeriodicities(formik, accessToken, newPaymentMethods[0].id);
      } catch (error) {
        captureNewError(
          error,
          {
            inFunction: "getValuesForSimulate",
            action: "getPeriodicities",
            screen: "SimulateCreditForm",
            file: "src/pages/request/credits/CreditDestinationRequest/forms/SimulateCreditForm/utils.ts",
          },
          { feature: "request-credit" },
        );
      }
    }
  } catch (error) {
    captureNewError(
      error,
      {
        inFunction: "getValuesForSimulate",
        action: "getPayrollsForProduct",
        screen: "SimulateCreditForm",
        file: "src/pages/request/credits/CreditDestinationRequest/forms/SimulateCreditForm/utils.ts",
      },
      { feature: "request-credit" },
    );
  }
};

export {
  getInitialSimulateCreditValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
};
