type PaymentType = "credit" | "commitment";

interface INextPaymentData {
  nextCapital?: number;
  nextInterest?: number;
  nextPastDueInterest?: number;
  nextPenaltyInterest?: number;
  nextLifeInsurance?: number;
  nextOtherConcepts?: number;
  nextCapitalization?: number;
  nextPaymentValue: number;
}

interface IExpiredPaymentData {
  expiredCapital?: number;
  expiredInterest?: number;
  expiredPastDueInterest?: number;
  expiredPenaltyInterest?: number;
  expiredLifeInsurance?: number;
  expiredOtherConcepts?: number;
  expiredCapitalization?: number;
  expiredValue: number;
}

interface ICurrentPaymentData {
  currentCapital?: number;
  currentInterest?: number;
  currentPastDueInterest?: number;
  currentPenaltyInterest?: number;
  currentLifeInsurance?: number;
  currentOtherConcepts?: number;
  currentCapitalization?: number;
  currentValue?: number;
}

export type {
  PaymentType,
  INextPaymentData,
  IExpiredPaymentData,
  ICurrentPaymentData,
};
