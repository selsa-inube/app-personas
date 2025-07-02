import { ILink } from "@components/cards/QuickAccess/types";

interface IHeaderLink {
  label: string;
  path: string;
  icon: React.JSX.Element;
}
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

export type { IHeader, INav, ISection, IHeaderLink };
