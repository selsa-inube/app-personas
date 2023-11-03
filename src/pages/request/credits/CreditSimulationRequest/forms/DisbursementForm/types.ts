interface IDisbursementEntry {
  disbursementType: string;
  accountNumber?: string;
  writeAccountNumber?: string;
  observations?: string;
  supplier?: string;
  identificationType?: string;
  identification?: string;
  socialReason?: string;
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  gender?: string;
  others?: string;
  entity?: string;
  accountType?: string;
}

export type { IDisbursementEntry };
