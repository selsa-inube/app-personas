import { createContext, useMemo, useState } from "react";
import { ISavingsContext, ISavingsState } from "./types";
import { ICommitment } from "src/model/entity/product";

const SavingsContext = createContext<ISavingsContext>({} as ISavingsContext);

interface SavingsProviderProps {
  children: React.ReactNode;
}

function SavingsProvider(props: SavingsProviderProps) {
  const { children } = props;
  const [savings, setSavings] = useState<ISavingsState>({
    savingsAccounts: [],
    programmedSavings: [],
    savingsContributions: [],
    cdats: [],
  });

  const [commitments, setCommitments] = useState<ICommitment[]>([]);

  const authContext = useMemo(
    () => ({
      savings,
      setSavings,
      commitments,
      setCommitments,
    }),
    [savings, setSavings, commitments, setCommitments],
  );

  return (
    <SavingsContext.Provider value={authContext}>
      {children}
    </SavingsContext.Provider>
  );
}

export { SavingsContext, SavingsProvider };
export type { SavingsProviderProps };
