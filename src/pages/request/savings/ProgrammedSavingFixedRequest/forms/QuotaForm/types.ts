interface IQuotaEntry {
    periodicValue: string;
    paymentMethod:string;
    periodicity: string;
    paydayTypeToSelect?:string;
    paydayByDate?: string;
  }
  
  export type { IQuotaEntry };