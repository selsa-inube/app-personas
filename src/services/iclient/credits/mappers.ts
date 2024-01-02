import { TagProps } from "@design/data/Tag";
import { IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";

const mapCreditApiToEntity = (credit: Record<string, any>): IProduct => {
  const nextPaymentDate = new Date(credit.nextPaymentDate);
  nextPaymentDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attributes = [
    {
      id: "net_value",
      label: "Saldo total",
      value: Number(credit.balanceObligation.TotalPending),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: formatPrimaryDate(nextPaymentDate),
    },
  ];

  const tags: TagProps[] =
    today > nextPaymentDate
      ? [
          {
            label: "En mora",
            appearance: "error",
          },
        ]
      : [];

  return {
    id: credit.obligationNumber,
    title: credit.productName,
    description: `${credit.productName} ${credit.obligationNumber}`,
    type: credit.lineCode,
    attributes,
    movements: [],
    amortization: [],
    tags,
  };
};

const mapCreditsApiToEntities = (
  credits: Record<string, any>[]
): IProduct[] => {
  return credits.map((credit) => mapCreditApiToEntity(credit));
};

export { mapCreditApiToEntity, mapCreditsApiToEntities };
