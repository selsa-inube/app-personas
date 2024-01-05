import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { IMovement } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { ViewMovement } from "../../MyCredits/ViewMovement";

const mapCreditMovement = (movement: IEntry): IMovement => {
  return {
    id: movement?.id,
    date: movement?.date,
    reference: movement?.reference,
    description: movement?.description,
    capitalPayment: movement?.capitalPayment,
    interest: movement?.interest,
    lifeInsurance: movement?.lifeInsurance,
    patrimonialInsurance: movement?.patrimonialInsurance,
    capitalization: movement?.capitalization,
    commission: movement?.commission,
    totalValue: movement?.totalValue,
  };
};

const creditMovementsCurrencyEntries = (movements: IMovement[]) =>
  movements.map((entry) => ({
    ...entry,
    capitalPayment: currencyFormat(entry.capitalPayment || 0),
    interest: currencyFormat(entry.interest || 0),
    lifeInsurance: currencyFormat(entry.lifeInsurance || 0),
    patrimonialInsurance: currencyFormat(entry.patrimonialInsurance || 0),
    capitalization: currencyFormat(entry.capitalization || 0),
    commission: currencyFormat(entry.commission || 0),
    totalValue: currencyFormat(entry.totalValue),
  }));

const creditMovementsTableActions: IAction[] = [
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
      <ViewMovement movement={mapCreditMovement(movement)} />
    ),
    mobilePriority: true,
  },
];

export {
  creditMovementsCurrencyEntries,
  creditMovementsTableActions,
  mapCreditMovement,
};
