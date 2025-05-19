import { IRequest } from "src/model/entity/request";

interface IRequestsContext {
  requests: IRequest[];
  entries: IRequest[];
  setEntries: React.Dispatch<React.SetStateAction<IRequest[]>>;
  setRequests: React.Dispatch<React.SetStateAction<IRequest[]>>;
}

export type { IRequestsContext };
