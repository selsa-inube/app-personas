interface ICancelProgrammedSavingRequest {
  balanceSaving: number;
  customerCode: string;
  disbursmentMethod: {
    id: string;
    name: string;
    accountNumber?: string;
    transferAccountType?: string;
    transferBankEntity?: string;
    transferAccountNumber?: string;
    businessName?: string;
    firstName?: string;
    secondName?: string;
    firstLastName?: string;
    secondLastName?: string;
    gender?: string;
    genderName?: string;
    identificationType?: string;
    identification?: string;
  };
  productName: string;
  productNumber: string;
}

interface ICancelProgrammedSavingResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type { ICancelProgrammedSavingRequest, ICancelProgrammedSavingResponse };
