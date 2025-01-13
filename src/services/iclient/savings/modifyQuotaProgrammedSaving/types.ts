interface IModifyQuotaProgrammedSavingRequest {
  customerCode: string;
  savingNumber: string;
  quotaValue: number;
}

interface IModifyQuotaProgrammedSavingResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type {
  IModifyQuotaProgrammedSavingRequest,
  IModifyQuotaProgrammedSavingResponse,
};
