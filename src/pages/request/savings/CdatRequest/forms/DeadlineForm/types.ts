interface IDeadlineEntry {
  valueInvestment?: number;
  simulationWithDate: boolean;
  simulationWithDays: boolean;
  deadlineDate: string;
  deadlineDays: string;
  hasResult: boolean;
  effectiveAnnualRate?: number;
  totalInterest?: number;
  withholdingTax?: number;
}

export type { IDeadlineEntry };
