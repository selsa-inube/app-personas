import { IAttribute, IProduct } from "src/types/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const investmentAttributes = [
  "investment_value",
  "expiration_date",
  "interest_rate",
  "request_date",
  "deadline_days",
  "description",
];

const investmentCurrencyAttributes = ["investment_value"];

function extractInvestmentAttributes(investment: IProduct) {
  const foundAttributes = investment.attributes.filter((attribute) =>
    investmentAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      investmentAttributes.indexOf(a.id) - investmentAttributes.indexOf(b.id)
  );
}

function formatInvestmentCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (investmentCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export { extractInvestmentAttributes, formatInvestmentCurrencyAttrs };
