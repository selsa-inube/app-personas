import { IProduct } from "src/model/entity/product";

interface ICardsContext {
  cards: IProduct[];
  creditQuotas: IProduct[];
  creditQuotaDetails: IProduct | undefined;
  consumptions:IProduct[];
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotas: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotaDetails: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
  setConsumptions:React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ICardsContext };
