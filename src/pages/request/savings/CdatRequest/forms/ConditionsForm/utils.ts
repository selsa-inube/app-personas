import { IRate } from "src/model/entity/product";
import { removeLastCharacters } from "src/utils/texts";
import * as Yup from "yup";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";
import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";

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

const validationSchema = Yup.object({
  deadlineDate: validationRules.notPastDate.required(
    validationMessages.required,
  ),
  deadlineDays: Yup.number()
    .min(
      minDeadlineDays(investmentsRatesMocks),
      `El plazo minimo en días debe ser mayor o igual a:  ${minDeadlineDays(
        investmentsRatesMocks,
      )} días`,
    )
    .max(
      maxDeadlineDays(investmentsRatesMocks),
      `El plazo máximo en días debe ser menor o igual a:  ${maxDeadlineDays(
        investmentsRatesMocks,
      )} días`,
    ),
});

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
  validationSchema,
  effectiveAnnualRateRequest,
  maxDeadlineDays,
  minDeadlineDays,
  totalInterestRequest,
};
