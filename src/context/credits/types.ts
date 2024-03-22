import { IProduct } from "src/model/entity/product";

interface ICreditsContext {
  credits: IProduct[];
  setCredits: React.Dispatch<React.SetStateAction<IProduct[]>>;
 
}

export type { ICreditsContext };
