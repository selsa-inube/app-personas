import {
  maxDeadlineMock,
  maximumQuotasAvailableMock,
} from "@mocks/products/credits/request.mocks";
import { FormikValues } from "formik";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

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

const getInitialCreditContidionValidations = (formik: FormikValues) => {
  const maxDeadline =
    maxDeadlineMock[formik.values.product as keyof typeof maxDeadlineMock];

  const maximumQuotas =
    maximumQuotasAvailableMock[
      formik.values.creditDestination as keyof typeof maximumQuotasAvailableMock
    ];

  const withRecommendation = formik.values.product === "generateRecommendation";

  return validationSchema.concat(
    Yup.object({
      deadline: Yup.number()
        .min(1, validationMessages.minNumbers(10))
        .max(
          maxDeadline,
          `El plazo máximo para este producto es de ${maxDeadline} meses`,
        ),
      amount: Yup.number()
        .min(1, validationMessages.minCurrencyNumbers(1))
        .max(maximumQuotas.noWarranty, "Has superado el cupo máximo")
        .required(validationMessages.required),

      interestRate: withRecommendation
        ? Yup.number()
        : Yup.number().required(validationMessages.required),
      cycleInterest: withRecommendation
        ? Yup.number()
        : Yup.number().required(validationMessages.required),
      netValue: withRecommendation
        ? Yup.number()
        : Yup.number().required(validationMessages.required),
      hasResult: withRecommendation
        ? Yup.boolean()
        : Yup.boolean().required(validationMessages.required),
    }),
  );
};

export { getInitialCreditContidionValidations, validationSchema };
