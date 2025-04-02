import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@inubekit/inubekit";
import { IMovement } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
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

const creditMovementsNormalizeEntries = (movements: IMovement[]) =>
  movements.map((entry) => ({
    ...entry,
    date: entry.date && formatPrimaryTimestamp(entry.date),
    capitalPayment:
      entry.capitalPayment && currencyFormat(entry.capitalPayment),
    interest: entry.interest && currencyFormat(entry.interest),
    lifeInsurance: entry.lifeInsurance && currencyFormat(entry.lifeInsurance),
    patrimonialInsurance:
      entry.patrimonialInsurance && currencyFormat(entry.patrimonialInsurance),
    capitalization:
      entry.capitalization && currencyFormat(entry.capitalization),
    commission: entry.commission && currencyFormat(entry.commission),
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
  creditMovementsNormalizeEntries,
  creditMovementsTableActions,
  mapCreditMovement,
};
