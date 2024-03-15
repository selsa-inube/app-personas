import { IProduct } from "src/model/entity/product";

interface ICreditsContext {
  credits: IProduct[];
  cards: IProduct[];
  creditQuotas: IProduct[];
  consumptions: IProduct[];
  setCredits: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotas: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setConsumptions: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ICreditsContext };
