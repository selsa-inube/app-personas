interface IConditionsEntry {
  valueInvestment?: number;
  interestPayment: string;
  simulationWithDate: boolean;
  deadlineDate: string;
  deadlineDays: string;
  hasResult: boolean;
  effectiveAnnualRate?: number;
  totalInterest?: number;
  withholdingTax?: number;
}

export type { IConditionsEntry };
