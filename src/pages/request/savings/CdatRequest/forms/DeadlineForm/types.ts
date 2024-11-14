interface IDeadlineEntry {
  productId: string;
  productName: string;
  investmentValue: number;
  simulationWithDate: boolean;
  simulationWithDays: boolean;
  deadlineDate?: string;
  deadlineDays?: number;
  hasResult: boolean;
  expirationDate?: Date;
  effectiveAnnualRate?: number;
  totalInterest?: number;
  withholdingTax?: number;
  rateTerms: IRateTerm[];
}

interface IRateTerm {
  id?: string;
  deadlineFrom: number;
  deadlineTo: number;
  rate: number;
}

export type { IDeadlineEntry, IRateTerm };
