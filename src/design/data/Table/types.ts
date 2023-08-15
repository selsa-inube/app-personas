const actionAppearance = [
  "primary",
  "success",
  "warning",
  "error",
  "help",
  "dark",
  "gray",
  "light",
] as const;

type ActionAppearanceType = (typeof actionAppearance)[number];

interface ITitle {
  id: string;
  titleName: string;
  priority: number;
}

interface IEntry {
  id: string;
  [key: string]: string | number;
}

interface IAction {
  id: string;
  actionName: string;
  content: (entry: IEntry) => React.ReactNode;
}

interface IBreakpoint {
  breakpoint: string;
  totalColumns: number;
}

export type { IAction, IBreakpoint, IEntry, ITitle };
