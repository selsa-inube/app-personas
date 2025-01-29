import { IOption } from "@inubekit/inubekit";

interface IDisbursementEntry {
  disbursements: IOption[];
  disbursement?: string;
  disbursementName?: string;
  accountStatus?: string;
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
  bankEntity?: string;
  bankEntityName?: string;
  accountType?: string;
}

export type { IDisbursementEntry };
