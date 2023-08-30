import { IEntry } from "@design/data/Table/types";
import { IAmortization } from "@ptypes/pages/product.types";

const mapPayment = (payment: IEntry): IAmortization => {
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

function currencyFormat(value: number) {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
}

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

export { formatCurrencyEntries, mapPayment };
