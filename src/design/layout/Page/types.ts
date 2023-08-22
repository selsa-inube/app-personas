import { ILink } from "@components/cards/QuickAccess/types";

interface IHeader {
  logoURL: string;
  username: string;
  client?: string;
}
interface INav {
  title?: string;
  sections: ISection[];
}

interface ISection {
  title: string;
  links: ILink[];
}

export type { IHeader, INav, ISection };
