import { IRequest } from "src/model/entity/request";

interface IRequestsContext {
  requests: IRequest[];
  setRequests: React.Dispatch<React.SetStateAction<IRequest[]>>;
}

export type { IRequestsContext };
