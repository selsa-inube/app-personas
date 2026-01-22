interface IBankTransfersEntry {
  bankEntityCode: string;
  bankEntityName: string;
  accountType: string;
  accountNumber: number | "";
  currentData?: IBankTransfersEntry;
}

export type { IBankTransfersEntry };
