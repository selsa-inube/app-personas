interface IPersonalDebtEntry {
  id?: string;
  liabilityType?: string;
  debtName?: string;
  terminationDate?: string;
  debtBalance?: string;
  financialEntity?: string;
  quota?: string;
  observations?: string;
}

interface IPersonalDebtEntries extends IPersonalDebtEntry {
  entries: IPersonalDebtEntry[];
}

export type { IPersonalDebtEntries, IPersonalDebtEntry };
