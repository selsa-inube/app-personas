interface ITitle {
  id: string;
  titleName: string;
  priority: number;
}

interface IEntry {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IAction {
  id: string;
  actionName: string;
  content: (entry: IEntry) => React.ReactNode;
  mobilePriority?: boolean;
}

interface IBreakpoint {
  breakpoint: string;
  totalColumns: number;
}

export type { IAction, IBreakpoint, IEntry, ITitle };
