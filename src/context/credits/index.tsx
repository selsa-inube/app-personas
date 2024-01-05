import { createContext, useMemo, useState } from "react";
import { IProduct } from "src/model/entity/product";
import { ICreditsContext } from "./types";

const CreditsContext = createContext<ICreditsContext>({} as ICreditsContext);

interface CreditsProviderProps {
  children: React.ReactNode;
}

function CreditsProvider(props: CreditsProviderProps) {
  const { children } = props;
  const [credits, setCredits] = useState<IProduct[]>([]);

  const authContext = useMemo(
    () => ({
      credits,
      setCredits,
    }),
    [credits, setCredits]
  );

  return (
    <CreditsContext.Provider value={authContext}>
      {children}
    </CreditsContext.Provider>
  );
}

export { CreditsContext, CreditsProvider };
export type { CreditsProviderProps };
