import { IUser } from "src/services/identidad/types";

interface IAppContext {
  user?: IUser;
  handleLogout: () => void;
}

export type { IAppContext };
