interface IPersonalDebtEntry {
  id?: string;
  liabilityType?: string;
  terminationDate?: string;
  debtBalance?: number;
  financialEntity?: string;
  quota?: number;
  observations?: string;
}

interface IPersonalDebtEntries extends IPersonalDebtEntry {
  entries: IPersonalDebtEntry[];
}

export type { IPersonalDebtEntries, IPersonalDebtEntry };
