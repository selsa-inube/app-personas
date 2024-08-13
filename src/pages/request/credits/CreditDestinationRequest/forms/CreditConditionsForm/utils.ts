import { FormikProps } from "formik";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { getPaymentMethodsForProduct } from "src/services/iclient/credits/getPaymentMethodsForProduct";
import { getPeriodicitiesForProduct } from "src/services/iclient/credits/getPeriodicitiesForProduct";
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
  cycleInterest: Yup.number(),
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

const getValuesForSimulate = async (
  formik: FormikProps<ICreditConditionsEntry>,
  accessToken: string,
  userIdentification: string,
) => {
  if (accessToken) {
    const products = await getPaymentMethodsForProduct(
      userIdentification,
      accessToken,
      formik.values.product.id,
    );
    formik.setFieldValue("paymentMethods", products);

    if (formik.values.paymentMethod) {
      const periodicities = await getPeriodicitiesForProduct(
        accessToken,
        formik.values.product.id,
        formik.values.paymentMethod.id,
      );

      const mappedPeriodicities = periodicities.map((periodicity) => {
        const matchedDomain = periodicityDM.valueOf(periodicity.id);
        return matchedDomain
          ? { id: matchedDomain.id, value: matchedDomain.value }
          : { id: periodicity.id, value: periodicity.id };
      });

      formik.setFieldValue("periodicities", mappedPeriodicities);

      if (periodicities.length === 1) {
        formik.setFieldValue("periodicity", mappedPeriodicities[0]);
      }
    }
  }
};

export {
  getInitialCreditContidionValidations,
  getValuesForSimulate,
  validationSchema,
};
