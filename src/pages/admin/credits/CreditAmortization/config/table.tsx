import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { IAmortization } from "src/model/entity/product";
import { currencyFormat } from "src/utils/formats";
import { ViewPayment } from "../../MyCredits/ViewPayment";

const mapCreditPayment = (payment: IEntry): IAmortization => {
  return {
    id: payment?.id,
    date: payment?.date,
    paymentNumber: payment?.paymentNumber,
    capitalPayment: payment?.capitalPayment,
    interest: payment?.interest,
    lifeInsurance: payment?.lifeInsurance,
    patrimonialInsurance: payment?.patrimonialInsurance,
    capitalization: payment?.capitalization,
    others: payment?.others,
    totalMonthlyValue: payment?.totalMonthlyValue,
    projectedBalance: payment?.projectedBalance,
  };
};

const formatCurrencyEntries = (amortization: IAmortization[]) =>
  amortization.map((entry) => {
    return {
      ...entry,
      others: currencyFormat(entry.others),
      interest: currencyFormat(entry.interest),
      capitalPayment: currencyFormat(entry.capitalPayment),
      lifeInsurance: currencyFormat(entry.lifeInsurance),
      capitalization: currencyFormat(entry.capitalization),
      totalMonthlyValue: currencyFormat(entry.totalMonthlyValue),
      projectedBalance: currencyFormat(entry.projectedBalance),
      patrimonialInsurance: currencyFormat(entry.patrimonialInsurance),
    };
  });

const creditAmortizationTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Cuota",
    content: (amortization) => (
      <Text type="body" size="small" appearance="dark">
        {amortization.totalMonthlyValue}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (payment) => <ViewPayment payment={mapCreditPayment(payment)} />,
    mobilePriority: true,
  },
];

export {
  creditAmortizationTableActions,
  formatCurrencyEntries,
  mapCreditPayment,
};
