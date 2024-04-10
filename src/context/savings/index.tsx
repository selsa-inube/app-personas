import { createContext, useMemo, useState } from "react";
import { ICommitment } from "src/model/entity/product";
import { ISavingsContext, ISavingsState } from "./types";

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

  const savingsContext = useMemo(
    () => ({
      savings,
      setSavings,
      commitments,
      setCommitments,
    }),
    [savings, setSavings, commitments, setCommitments],
  );

  return (
    <SavingsContext.Provider value={savingsContext}>
      {children}
    </SavingsContext.Provider>
  );
}

export { SavingsContext, SavingsProvider };
export type { SavingsProviderProps };
