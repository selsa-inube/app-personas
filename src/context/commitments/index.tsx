import { createContext, useMemo, useState } from "react";
import { ICommitmentsContext } from "./types";
import { ICommitment } from "src/model/entity/product";

const CommitmentsContext = createContext<ICommitmentsContext>(
  {} as ICommitmentsContext,
);

interface CommitmentsProviderProps {
  children: React.ReactNode;
}

function CommitmentsProvider(props: CommitmentsProviderProps) {
  const { children } = props;
  const [commitments, setCommitments] = useState<ICommitment[]>([]);

  const authContext = useMemo(
    () => ({
      commitments,
      setCommitments,
    }),
    [commitments, setCommitments],
  );

  return (
    <CommitmentsContext.Provider value={authContext}>
      {children}
    </CommitmentsContext.Provider>
  );
}

export { CommitmentsContext, CommitmentsProvider };
export type { CommitmentsProviderProps };
