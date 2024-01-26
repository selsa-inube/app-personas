import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const productsAttributes: Record<string, string[]> = {
  CA: [
    "net_value",
    "min_value",
    "account_state",
    "account_gmf",
    "account_ADA",
    "account_to_salary",
    "interest_rate",
  ],
  AP: ["saved_value", "interest_rate"],
  APE: ["saved_value", "withdrawal_balance", "pending_payment"],
  AS: ["saved_value", "pending_payment"],
  CD: [
    "title",
    "net_value",
    "expiration_date",
    "interest_rate",
    "request_date",
    "deadline_days",
    "description",
  ],
};

const savingCurrencyAttributes: Record<string, string[]> = {
  CA: ["net_value", "min_value"],
  AP: ["saved_value"],
  APE: ["saved_value", "pending_payment", "withdrawal_balance"],
  AS: ["saved_value", "pending_payment", "withdrawal_balance"],
  CD: ["net_value"],
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
