import { IProduct } from "src/model/entity/product";

interface ICreditsContext {
  credits: IProduct[];
  cards: IProduct[];
  setCredits: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCards: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export type { ICreditsContext };
