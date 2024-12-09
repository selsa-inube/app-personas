import { ITag } from "@inubekit/tag";

interface IFile {
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
  file?: IFile;
}

export type { IPQRS };
