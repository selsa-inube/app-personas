import { IAttribute, IProduct } from "src/types/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const savingAttributes = [
  "net_value",
  "min_value",
  "account_state",
  "account_gmf",
  "account_ADA",
  "account_to_salary",
  "interest_rate",
];

const savingCurrencyAttributes = ["net_value", "min_value"];

function extractSavingAttributes(saving: IProduct) {
  const foundAttributes = saving.attributes.filter((attribute) =>
    savingAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) => savingAttributes.indexOf(a.id) - savingAttributes.indexOf(b.id)
  );
}

function formatSavingCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (savingCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export { extractSavingAttributes, formatSavingCurrencyAttrs };
