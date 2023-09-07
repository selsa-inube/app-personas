import { IAttribute, IProduct } from "src/types/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const savingAttributes: Record<string, string[]> = {
  CA: [
    "net_value",
    "min_value",
    "account_state",
    "account_gmf",
    "account_ADA",
    "account_to_salary",
    "interest_rate",
  ],
  AP: ["net_value", "withdrawal_balance", "pending_payment"],
};

const savingCurrencyAttributes: Record<string, string[]> = {
  CA: ["net_value", "min_value"],
  AP: ["net_value", "pending_payment", "withdrawal_balance"],
};

function extractSavingAttributes(saving: IProduct) {
  const savingType = saving.type;

  const foundAttributes = saving.attributes.filter((attribute) =>
    savingAttributes[savingType].includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      savingAttributes[savingType].indexOf(a.id) -
      savingAttributes[savingType].indexOf(b.id)
  );
}

function formatSavingCurrencyAttrs(
  attributes: IAttribute[],
  productType: string
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
