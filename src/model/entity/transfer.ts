import { TagProps } from "@design/data/Tag";

interface ITransfer {
  id: string;
  title: string;
  destination: string;
  value: number;
  origin: string;
  date: Date;
  tag: TagProps;
}

interface ITransferRequest {
  customerCode: string;
  customerName: string;
  savingAccount: string;
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
