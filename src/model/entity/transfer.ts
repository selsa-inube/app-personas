import { ITag } from "@inubekit/inubekit";
import { IDomainType } from "@ptypes/domain.types";

interface ITransfer {
  id: string;
  title: string;
  destination: string;
  value: number;
  source: string;
  date: Date;
  tag: ITag;
}

interface ITransferRequest {
  customerCode: string;
  customerName: string;
  transferDate: Date;
  source: IDomainType;
  destination: string;
  amount: number;
  urlRedirect: string;
}

interface ITransferRequestResponse {
  trackingCode: string;
  url?: string;
  state: string;
  message: string;
}

export type { ITransfer, ITransferRequest, ITransferRequestResponse };
