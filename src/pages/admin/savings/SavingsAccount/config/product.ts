import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const productsAttributes: Record<string, string[]> = {
  [EProductType.PROGRAMMEDSAVINGS]: [
    "net_value",
    "interest_rate",
    "request_date",
  ],
  [EProductType.PERMANENTSAVINGS]: [
    "net_value",
    "withdrawal_balance",
    "pending_payment",
  ],
  [EProductType.CONTRIBUTIONS]: ["net_value"],
  [EProductType.VIEWSAVINGS]: [
    "net_value",
    "min_value",
    "account_state",
    "request_date",
    "account_gmf",
  ],
  [EProductType.CDAT]: [
    "title",
    "net_value",
    "expiration_date",
    "interest_rate",
    "request_date",
    "deadline_days",
    "payment_interest",
  ],
};

const savingCurrencyAttributes: Record<string, string[]> = {
  [EProductType.PROGRAMMEDSAVINGS]: ["net_value"],
  [EProductType.PERMANENTSAVINGS]: [
    "net_value",
    "pending_payment",
    "withdrawal_balance",
  ],
  [EProductType.CONTRIBUTIONS]: [
    "net_value",
    "pending_payment",
    "withdrawal_balance",
  ],
  [EProductType.VIEWSAVINGS]: ["net_value", "min_value"],
  [EProductType.CDAT]: ["net_value"],
};

function extractSavingAttributes(saving: IProduct) {
  const savingType = saving.type;

  const foundAttributes = saving.attributes.filter((attribute) =>
    productsAttributes[savingType].includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      productsAttributes[savingType].indexOf(a.id) -
      productsAttributes[savingType].indexOf(b.id),
  );
}

function formatSavingCurrencyAttrs(
  attributes: IAttribute[],
  productType: string,
) {
  return attributes.map((attribute) => {
    if (savingCurrencyAttributes[productType].includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export { extractSavingAttributes, formatSavingCurrencyAttrs };
