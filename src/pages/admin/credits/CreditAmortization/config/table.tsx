import { IAction, IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { IAmortization } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate, parseSpanishDate } from "src/utils/dates";
import { ViewPayment } from "../../MyCredits/ViewPayment";

const mapCreditPayment = (payment: IEntry): IAmortization => {
  return {
    id: payment?.id,
    date: payment?.date,
    type: payment?.type,
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

const amortizationNormalizeEntries = (amortization: IAmortization[]) =>
  amortization.map((entry) => ({
    ...entry,
    date: entry.date && formatPrimaryDate(entry.date),
    type: entry.type,
    others: currencyFormat(entry.others),
    interest: currencyFormat(entry.interest),
    capitalPayment:
      entry.capitalPayment && currencyFormat(entry.capitalPayment),
    lifeInsurance: entry.lifeInsurance && currencyFormat(entry.lifeInsurance),
    capitalization:
      entry.capitalization && currencyFormat(entry.capitalization),
    totalMonthlyValue: currencyFormat(entry.totalMonthlyValue),
    projectedBalance: currencyFormat(entry.projectedBalance),
    patrimonialInsurance:
      entry.patrimonialInsurance && currencyFormat(entry.patrimonialInsurance),
  }));

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

const customAppearanceCallback = (columnId: string, entry: IEntry) => {
  if (columnId === "date") {
    const today = new Date();
    today.setUTCHours(5, 5, 5, 5);

    const entryDate = new Date(parseSpanishDate(entry.date));
    entryDate.setUTCHours(5, 5, 5, 5);

    if (today > entryDate) {
      return "error";
    }
  }

  return "dark";
};

export {
  amortizationNormalizeEntries,
  creditAmortizationTableActions,
  customAppearanceCallback,
  mapCreditPayment,
};
