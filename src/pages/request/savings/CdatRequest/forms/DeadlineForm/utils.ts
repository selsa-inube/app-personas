import { IRate } from "src/model/entity/product";
import { removeLastCharacters } from "src/utils/texts";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const validationSchema = Yup.object({
  deadlineDate: validationRules.notPastDate,
  deadlineDays: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
  effectiveAnnualRate: Yup.number(),
  totalInterest: Yup.number(),
  withholdingTax: Yup.number(),
  netValue: Yup.number(),
  hasResult: Yup.boolean(),
});

const getInitialCdatDeadlineValidations = () => {
  return validationSchema.concat(
    Yup.object({
      deadlineDate: validationRules.notPastDate,
      deadlineDays: Yup.number()
        .min(
          90,
          `El plazo minimo en días debe ser mayor o igual a:  ${90} días`,
        )
        .max(
          90,
          `El plazo máximo en días debe ser menor o igual a:  ${90} días`,
        ),
      effectiveAnnualRate: Yup.number().required(validationMessages.required),
      totalInterest: Yup.number().required(validationMessages.required),
      withholdingTax: Yup.number().required(validationMessages.required),
      netValue: Yup.number().required(validationMessages.required),
      hasResult: Yup.boolean().required(validationMessages.required),
    }),
  );
};

const maxDeadlineDays = (investmentsRates: IRate[]) => {
  return investmentsRates.reduce(
    (previousValue: IRate, currentValue: IRate) => {
      return currentValue.deadlineEndDay > previousValue.deadlineEndDay
        ? currentValue
        : previousValue;
    },
  ).deadlineEndDay;
};

const minDeadlineDays = (investmentsRates: IRate[]) => {
  return investmentsRates.reduce(
    (previousValue: IRate, currentValue: IRate) => {
      return currentValue.deadlineInitialDay < previousValue.deadlineInitialDay
        ? currentValue
        : previousValue;
    },
  ).deadlineInitialDay;
};

const filteredEffectiveAnnualRate = (
  investmentsRates: IRate[],
  deadlineDays: number,
) => {
  return investmentsRates.find(
    (investmentsRate: IRate) =>
      deadlineDays >= investmentsRate.deadlineInitialDay &&
      deadlineDays <= investmentsRate.deadlineEndDay,
  );
};

const effectiveAnnualRateRequest = (
  investmentsRates: IRate[],
  deadlineDays: number,
) => {
  const effectiveAnnualRate = filteredEffectiveAnnualRate(
    investmentsRates,
    deadlineDays,
  );
  return effectiveAnnualRate
    ? removeLastCharacters(effectiveAnnualRate.annualEffectiveRate, 1)
    : 0;
};

const totalInterestRequest = (
  valueInvestment: number,
  investmentsRates: IRate[],
  deadlineDays: number,
) => {
  return Math.round(
    valueInvestment *
      (effectiveAnnualRateRequest(investmentsRates, deadlineDays) / 100) *
      (deadlineDays / 365),
  );
};

export {
  effectiveAnnualRateRequest,
  getInitialCdatDeadlineValidations,
  maxDeadlineDays,
  minDeadlineDays,
  totalInterestRequest,
  validationSchema,
};
