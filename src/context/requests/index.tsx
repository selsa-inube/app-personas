import { createContext, useMemo, useState } from "react";
import { IRequest } from "src/model/entity/request";
import { IRequestsContext } from "./types";

const RequestsContext = createContext<IRequestsContext>({} as IRequestsContext);

interface RequestsProviderProps {
  children: React.ReactNode;
}

function RequestsProvider(props: RequestsProviderProps) {
  const { children } = props;
  const [requests, setRequests] = useState<IRequest[]>([]);

  const requestsContext = useMemo(
    () => ({
      requests,
      setRequests,
    }),
    [requests, setRequests],
  );

  return (
    <RequestsContext.Provider value={requestsContext}>
      {children}
    </RequestsContext.Provider>
  );
}

export { RequestsContext, RequestsProvider };
export type { RequestsProviderProps };
