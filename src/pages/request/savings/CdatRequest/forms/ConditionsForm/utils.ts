import { IRate } from "src/model/entity/product";
import { removeLastCharacters } from "src/utils/texts";

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
  maxDeadlineDays,
  minDeadlineDays,
  totalInterestRequest,
};
