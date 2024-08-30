import { ITag } from "@inubekit/tag";
import { ISelectedDocument, IValidation } from "./service";
interface IRequest {
  id: string;
  title: string;
  product: string;
  destination: string;
  trackingCode: string;
  requestDate: Date;
  description: string;
  status: string;
  value: number;
  quotaValue: number;
  periodicity: string;
  deadline: string;
  interestRate: number;
  netValue: number;
  tag: ITag;
  validations: IValidation[];
  documentaryRequirements: ISelectedDocument[];
}

export type { IRequest };
