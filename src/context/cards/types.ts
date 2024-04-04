import { IProduct } from "src/model/entity/product";

interface ICardsContext {
  cards: IProduct[];
  creditQuotas: IProduct[];
  creditQuotaDetail?: IProduct;
  consumptions:IProduct[];
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotas: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotaDetail: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
  setConsumptions:React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ICardsContext };
