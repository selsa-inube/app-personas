import { FormikProps } from "formik";
import { IThird } from "src/model/entity/user";
import { captureNewError } from "src/services/errors/handleErrors";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { getPayrollsForProduct } from "src/services/iclient/productRequest/getPayrolls";
import { getPeriodicitiesForProduct } from "src/services/iclient/productRequest/getPeriodicities";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { IProgrammedSavingProduct } from "../DestinationForm/types";
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

const getInitialSavingConditionsValidations = (
  product: IProgrammedSavingProduct,
) => {
  return validationSchema.concat(
    Yup.object({
      quota: Yup.number()
        .min(
          product.minQuota,
          `El valor mínimo de la cuota es de ${currencyFormat(product.minQuota)}`,
        )
        .required(validationMessages.required),
      deadline: Yup.number()
        .min(
          product.minDeadline,
          `El plazo mínimo para este producto es de ${product.minDeadline} meses`,
        )
        .max(
          product.maxDeadline,
          `El plazo máximo para este producto es de ${product.maxDeadline} meses`,
        )
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
  product: IProgrammedSavingProduct,
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
        screen: "SavingConditionsForm",
        file: "src/pages/request/savings/ProgrammedSavingRequest/forms/SavingConditionsForm/utils.ts",
      },
      { feature: "request-programmed-saving" },
    );
  }

  try {
    const newPaymentMethods = await getPayrollsForProduct(
      "newprogrammedsaving",
      product.id,
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
            screen: "SavingConditionsForm",
            file: "src/pages/request/savings/ProgrammedSavingRequest/forms/SavingConditionsForm/utils.ts",
          },
          { feature: "request-programmed-saving" },
        );
      }
    }
  } catch (error) {
    captureNewError(
      error,
      {
        inFunction: "getValuesForSimulate",
        action: "getPayrollsForProduct",
        screen: "SavingConditionsForm",
        file: "src/pages/request/savings/ProgrammedSavingRequest/forms/SavingConditionsForm/utils.ts",
      },
      { feature: "request-programmed-saving" },
    );
  }
};

export {
  getInitialSavingConditionsValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
};
