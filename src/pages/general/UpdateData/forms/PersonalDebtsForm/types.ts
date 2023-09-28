interface IPersonalDebtEntry {
  liabilityType: string;
  terminationDate: string;
  debtBalance: number;
  financialEntity: string;
  quota: number;
}

interface IPersonalDebtEntries {
  entries: IPersonalDebtEntry[];
}

export type { IPersonalDebtEntries, IPersonalDebtEntry };
