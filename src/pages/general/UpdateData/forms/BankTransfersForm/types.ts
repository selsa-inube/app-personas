interface IBankTransfersEntry {
  bankEntityCode: string;
  bankEntityName: string;
  accountType: string;
  accountNumber: string;
  currentData?: IBankTransfersEntry;
}

export type { IBankTransfersEntry };
