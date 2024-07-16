import { FormikProps } from "formik";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ICreditConditionsEntry } from "./types";

const validationSchema = Yup.object({
  amount: validationRules.money.required(validationMessages.required),
  deadline: Yup.number()
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
      deadline: Yup.number()
        .min(1, validationMessages.minNumbers(10))
        .max(
          formik.values.product.maxDeadline || 0,
          `El plazo máximo para este producto es de ${formik.values.product.maxDeadline} meses`,
        ),
      amount: Yup.number()
        .min(1, validationMessages.minCurrencyNumbers(1))
        .max(maxDeadline, "Has superado el cupo máximo")
        .required(validationMessages.required),

      interestRate: withRecommendation
        ? Yup.number()
        : Yup.number().required(validationMessages.required),
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

export { getInitialCreditContidionValidations, validationSchema };
