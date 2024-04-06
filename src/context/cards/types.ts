import { IProduct } from "src/model/entity/product";

interface ICardsContext {
  cards: IProduct[];
  creditQuotas: IProduct[];
  creditQuotaDetail?: IProduct;
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotas: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCreditQuotaDetail: React.Dispatch<
    React.SetStateAction<IProduct | undefined>
  >;
}

export type { ICardsContext };
