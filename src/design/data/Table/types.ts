interface ITitle {
  id: string;
  titleName: string;
  priority: number;
}

interface IAction {
  id: string;
  actionName: string;
  content: (entry: any) => JSX.Element;
}

interface IBreakpoint {
  breakpoint: string;
  totalColumns: number;
}

export type { IAction, IBreakpoint, ITitle };
