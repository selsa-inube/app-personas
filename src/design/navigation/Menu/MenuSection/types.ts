import { MenuItemProps } from "../MenuItem";

interface ISection {
  title?: string;
  links: MenuItemProps[];
  divider?: boolean;
}

export type { ISection };
