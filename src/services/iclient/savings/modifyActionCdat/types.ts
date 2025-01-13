interface IModifyActionCdatRequest {
  customerCode: string;
  actionExpiration: string;
  savingNumber: string;
}

interface IModifyActionCdatResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type {
  IModifyActionCdatRequest,
  IModifyActionCdatResponse,
};
