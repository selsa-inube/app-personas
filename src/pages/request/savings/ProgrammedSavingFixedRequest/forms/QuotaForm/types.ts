interface IQuotaEntry {
    periodicValue: string;
    paymentMethod:string;
    periodicity: string;
    weeklyPayDay?:string;
    biweeklyPayDay?:string;
    monthlyPayDay?: string;
    semiannualPayDay?: string;
    annualPayDay?: string;
  }
  
  export type { IQuotaEntry };