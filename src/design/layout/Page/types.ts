import { ILink } from "@components/cards/QuickAccess/types";
import { IHeaderLink } from "@design/navigation/Header/types";

interface IHeader {
  logoURL: string;
  username: string;
  client?: string;
  links?: IHeaderLink[];
  portalId: string;
  logoutTitle: string;
  navigation: INav;
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
