import { ITag } from "@inubekit/inubekit";

interface INew {
  date: Date;
  description: string;
  icon: React.JSX.Element;
  tag?: ITag;
}

export type { INew };
