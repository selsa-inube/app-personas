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
  const [cards, setCards] = useState<IProduct[]>([]);
  const [creditQuotas, setCreditQuotas] = useState<IProduct[]>([]);
  const [consumptions, setConsumptions] = useState<IProduct[]>([]);

  const authContext = useMemo(
    () => ({
      credits,
      cards,
      creditQuotas,
      consumptions,

      setCredits,
      setCards,
      setCreditQuotas,
      setConsumptions,
    }),
    [
      credits,
      cards,
      creditQuotas,
      consumptions,
      setCredits,
      setCards,
      setCreditQuotas,
      setConsumptions,
    ],
  );

  return (
    <CreditsContext.Provider value={authContext}>
      {children}
    </CreditsContext.Provider>
  );
}

export { CreditsContext, CreditsProvider };
export type { CreditsProviderProps };
