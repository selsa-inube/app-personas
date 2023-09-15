import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/formats";

const investmentAttributes: Record<string, string[]> = {
  CD: [
    "investment_value",
    "expiration_date",
    "interest_rate",
    "request_date",
    "deadline_days",
    "description",
  ],
  AP: ["investment_value", "interest_rate"],
};

const investmentCurrencyAttributes: Record<string, string[]> = {
  CD: ["investment_value"],
  AP: ["investment_value"],
};

function extractInvestmentAttributes(investment: IProduct) {
  const investmentType = investment.type;

  const foundAttributes = investment.attributes.filter((attribute) =>
    investmentAttributes[investmentType].includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      investmentAttributes[investmentType].indexOf(a.id) -
      investmentAttributes[investmentType].indexOf(b.id)
  );
}

function formatInvestmentCurrencyAttrs(
  attributes: IAttribute[],
  productType: string
) {
  return attributes.map((attribute) => {
    if (investmentCurrencyAttributes[productType].includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export { extractInvestmentAttributes, formatInvestmentCurrencyAttrs };
