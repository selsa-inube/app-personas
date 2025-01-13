import { ITag } from "@inubekit/tag";
import { ISelectedDocument, IValidation } from "./service";
interface IRequest {
  id: string;
  title: string;
  product?: string;
  destination?: string;
  beneficiary?: string;
  detailsSituation?: string;
  trackingCode: string;
  requestDate: Date;
  description: string;
  status: string;
  value?: number;
  label?: string;
  quotaValue?: string;
  periodicity?: string;
  deadline?: string;
  interestRate?: number;
  netValue?: number;
  tag: ITag;
  validations: IValidation[];
  documentaryRequirements: ISelectedDocument[];
  requestType: RequestType;
  aidType?: string;
  paymentMethodName?: string;
  periodicityName?: string;
  disbursementMethodName?: string;
  disbursementAccount?: string;
  actionAfterExpiration?: string;
}

type RequestType =
  | "credit"
  | "aid"
  | "newprogrammedsaving"
  | "newcdat"
  | "cancelprogrammedsaving"
  | "modifydeadlineactionprogrammedsaving"
  | "cancelcdat"
  | "modifyquotavalueprogrammedsaving"
  | "modifydeadlineactioncdat";

export type { IRequest, RequestType };
