interface IDocumentDetails {
  documentTypeCode: string;
  sequence: string;
  fileName: string;
}

interface IPQRSDetails {
  pqrsId: string;
  eventId?: string;
  status?: {
    code?: string;
  };
  reasonName?: string;
  requestNumber: string;
  cus: string;
  requestDate: Date;
  description: string;
  typeName: string;
  placeName: string;
  documentDetails: IDocumentDetails[];
}

export type { IPQRSDetails };
