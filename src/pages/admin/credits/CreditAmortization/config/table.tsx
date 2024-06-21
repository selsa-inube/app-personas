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

const amortizationTableTitles = [
  {
    id: "date",
    titleName: "Fecha",
    priority: 1,
  },
  {
    id: "type",
    titleName: "Tipo",
    priority: 2,
  },
  {
    id: "capitalPayment",
    titleName: "Abono",
    priority: 3,
  },
  {
    id: "interest",
    titleName: "Interés",
    priority: 4,
  },
  {
    id: "others",
    titleName: "Otros",
    priority: 5,
  },
];

const amortizationTableBreakpoints = [
  { breakpoint: "(min-width: 1200px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1130px)", totalColumns: 5 },
  { breakpoint: "(max-width: 970px)", totalColumns: 4 },
  { breakpoint: "(max-width: 900px)", totalColumns: 6 },
  { breakpoint: "(max-width: 850px)", totalColumns: 5 },
  { breakpoint: "(max-width: 750px)", totalColumns: 4 },
  { breakpoint: "(max-width: 650px)", totalColumns: 3 },
  { breakpoint: "(max-width: 430px)", totalColumns: 2 },
];

const customAppearanceCallback = (columnId: string, entry: IEntry) => {
  if (columnId === "date") {
    const today = new Date();
    today.setUTCHours(5, 0, 0, 0);

    const entryDate = parseSpanishDate(entry.date);
    entryDate.setUTCHours(5, 0, 0, 0);

    if (today > entryDate) {
      return "error";
    }
  }

  return "dark";
};

export {
  amortizationNormalizeEntries,
  amortizationTableBreakpoints,
  amortizationTableTitles,
  creditAmortizationTableActions,
  customAppearanceCallback,
  mapCreditPayment,
};
