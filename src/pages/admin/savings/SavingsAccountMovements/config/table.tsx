import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { IMovement } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { ViewSavingMovement } from "../../MySavings/ViewSavingMovement";

const mapSavingAccountMovement = (movement: IEntry): IMovement => {
  return {
    id: movement?.id,
    date: movement?.date,
    reference: movement?.reference,
    description: movement?.description,
    totalValue: movement?.totalValue,
    sequence: movement?.sequence,
    cardNumber: movement?.cardNumber,
  };
};

const savingAccountMovementsNormalizeEntries = (movements: IMovement[]) =>
  movements.map((entry) => ({
    ...entry,
    date: entry.date && formatPrimaryDate(entry.date),
  }));

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
  { breakpoint: "(max-width: 450px)", totalColumns: 1 },
];

const savingsAccountMovementsTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => (
      <Text
        type="body"
        size="small"
        appearance={movement.totalValue >= 0 ? "dark" : "error"}
        cursorHover
      >
        {currencyFormat(movement.totalValue)}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (movement) => (
      <ViewSavingMovement movement={mapSavingAccountMovement(movement)} />
    ),
    mobilePriority: true,
  },
];

export {
  savingAccountMovementsNormalizeEntries,
  savingsAccountMovementsTableActions,
  savingsAccountMovementsTableBreakpoints,
  savingsAccountMovementsTableTitles,
};
