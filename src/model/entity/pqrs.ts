import { ITag } from "@inubekit/tag";

interface IFlie {
  id: string;
  name: string;
  size: number;
}

interface IPQRS {
  id: string;
  title: string;
  motive: string;
  code: string;
  date: Date;
  tag: ITag;
  description?: string;
  type: string;
  attentionPlace: string;
  details?: string;
  file?: IFlie;
}

export type { IPQRS };
