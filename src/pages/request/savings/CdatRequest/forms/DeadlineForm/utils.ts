import { IRate } from "src/model/entity/product";
import { removeLastCharacters } from "src/utils/texts";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const validationSchema = Yup.object({
  deadlineDate: validationRules.notPastDate,
  deadlineDays: Yup.number(),
  effectiveAnnualRate: Yup.number().required(validationMessages.required),
  totalInterest: Yup.number().required(validationMessages.required),
  withholdingTax: Yup.number().required(validationMessages.required),
  hasResult: Yup.boolean().required(validationMessages.required),
});

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
  investmentValue: number,
  investmentsRates: IRate[],
  deadlineDays: number,
) => {
  return Math.round(
    investmentValue *
      (effectiveAnnualRateRequest(investmentsRates, deadlineDays) / 100) *
      (deadlineDays / 365),
  );
};

export {
  effectiveAnnualRateRequest,
  maxDeadlineDays,
  minDeadlineDays,
  totalInterestRequest,
  validationSchema,
};
