interface IModifyActionProgrammedSavingRequest {
  customerCode: string;
  actionExpiration: string;
  savingNumber: string;
}

interface IModifyActionProgrammedSavingResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type {
  IModifyActionProgrammedSavingRequest,
  IModifyActionProgrammedSavingResponse,
};
