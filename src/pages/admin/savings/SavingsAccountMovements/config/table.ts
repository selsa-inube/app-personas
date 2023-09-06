import { IEntry } from "@design/data/Table/types";
import { IMovement } from "@ptypes/pages/product.types";

const mapSavingAccountMovement = (movement: IEntry): IMovement => {
  return {
    id: movement?.id,
    date: movement?.date,
    reference: movement?.reference,
    description: movement?.description,
    totalValue: movement?.totalValue,
  };
};

const savingsAccountMovementsTableTitles = [
  {
    id: "date",
    titleName: "Fecha",
    priority: 0,
  },
  {
    id: "reference",
    titleName: "Referencia",
    priority: 1,
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 2,
  },
];

const savingsAccountMovementsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 2 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 2 },
  { breakpoint: "(max-width: 890px)", totalColumns: 3 },
  { breakpoint: "(max-width: 860px)", totalColumns: 2 },
  { breakpoint: "(max-width: 390px)", totalColumns: 1 },
];

export {
  mapSavingAccountMovement,
  savingsAccountMovementsTableBreakpoints,
  savingsAccountMovementsTableTitles,
};
