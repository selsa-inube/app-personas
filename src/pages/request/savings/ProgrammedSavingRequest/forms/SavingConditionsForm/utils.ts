import { FormikProps } from "formik";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { IPeriodicity } from "src/model/entity/periodicity";
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

const periodicityFactors: Record<string, number> = {
  Diary: 30.44,
  Weekly: 4.33,
  Semiweekly: 2,
  Decadal: 3,
  Biweekly: 2,
  Monthly: 1,
  Bimonthly: 1 / 2,
  Quarterly: 1 / 3,
  FourMonths: 1 / 4,
  FiveMonths: 1 / 5,
  Biannual: 1 / 6,
  Annual: 1 / 12,
};

const getInitialSavingConditionsValidations = (
  product: IProgrammedSavingProduct,
  periodicity: IPeriodicity,
) => {
  const factor = periodicityFactors[periodicity.id] || 1;

  const minQuota = product.minQuota / factor;
  const minDeadline = product.minDeadline * factor;
  const maxDeadline = product.maxDeadline * factor;

  return validationSchema.concat(
    Yup.object({
      quota: Yup.number()
        .min(
          minQuota,
          `El valor mínimo de la cuota es ${currencyFormat(minQuota)} (equivalente a ${currencyFormat(product.minQuota)} mensuales)`,
        )
        .required(validationMessages.required),

      deadline: Yup.number()
        .min(
          minDeadline,
          `El plazo mínimo es de ${product.minDeadline} meses (${minDeadline} cuotas ${periodicityDM.valueOf(periodicity.id)?.value})`,
        )
        .max(
          maxDeadline,
          `El plazo máximo es de ${product.maxDeadline} meses (${maxDeadline} cuotas ${periodicityDM.valueOf(periodicity.id)?.value})`,
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
