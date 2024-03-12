import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const cardAttributes = [
  "card_number",
  "cardholder",
  "payment_method",
  "status",
  "savings_accounts",
  "handling_fee",
  "commissions"
];

const cardCurrencyAttributes = ["handling_fee"];

function extractCardAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    cardAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => cardAttributes.indexOf(a.id) - cardAttributes.indexOf(b.id),
  );
}

function formatCardCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (cardCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export { extractCardAttributes, formatCardCurrencyAttrs };