import { IProduct } from "src/model/entity/product";

interface ICardsContext {
  cards: IProduct[];
  creditQuotas: IProduct[];
  consumptions:IProduct[];
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotas: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setConsumptions:React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ICardsContext };
