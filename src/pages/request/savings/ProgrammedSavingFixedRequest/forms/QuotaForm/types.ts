interface IQuotaEntry {
  periodicValue: string;
  paymentMethod: string;
  periodicity: string;
  paydayTypeToSelect?: string;
  paydayByDate?: string;
  accountToDebit?: string;
  accountNumber?: string;
  accountDescription?: string;
}

export type { IQuotaEntry };
