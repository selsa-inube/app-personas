import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@inubekit/inubekit";
import { IMovement } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { ViewMovement } from "../ViewMovement";

const movementsTableTitles = [
  {
    id: "date",
    titleName: "Fecha",
    priority: 0,
  },
  {
    id: "reference",
    titleName: "Referencia",
    priority: 2,
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 1,
  },
];

const movementsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1070px)", totalColumns: 2 },
  { breakpoint: "(max-width: 920px)", totalColumns: 1 },
  { breakpoint: "(max-width: 895px)", totalColumns: 3 },
  { breakpoint: "(max-width: 820px)", totalColumns: 2 },
  { breakpoint: "(max-width: 670px)", totalColumns: 1 },
];

const mapConsumptionMovement = (movement: IEntry): IMovement => {
  return {
    id: movement?.id,
    date: movement?.date,
    reference: movement?.reference,
    description: movement?.description,
    totalValue: movement?.totalValue,
  };
};

const consumptionMovementsNormalizeEntries = (movements: IMovement[]) =>
  movements.map((entry) => ({
    ...entry,
    date: entry.date && formatPrimaryTimestamp(entry.date),
    totalValue: currencyFormat(entry.totalValue),
  }));

const consumptionMovementsTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => (
      <Text type="body" size="small" appearance="dark">
        {movement.totalValue}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (movement) => (
      <ViewMovement movement={mapConsumptionMovement(movement)} />
    ),
    mobilePriority: true,
  },
];

export {
  consumptionMovementsNormalizeEntries,
  consumptionMovementsTableActions,
};

export { movementsTableBreakpoints, movementsTableTitles };
