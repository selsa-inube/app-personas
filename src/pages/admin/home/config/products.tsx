import { IProduct } from "@ptypes/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const creditAttributes = [
  "next_payment_value",
  "next_payment_date",
  "net_value",
];

function extractCreditAttributes(credit: IProduct) {
  const attributes = credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id)
  );
  attributes.forEach((attribute) => {
    if (typeof attribute.value === "number") {
      attribute.value = currencyFormat(attribute.value);
    }
  });
  return attributes;
}

const investmentAttributes = ["investment_value"];

function extractInvestmentAttributes(investment: IProduct) {
  const investments = investment.attributes.filter((attribute) =>
    investmentAttributes.includes(attribute.id)
  );
  investments.forEach((investment) => {
    if (typeof investment.value === "number") {
      investment.value = currencyFormat(investment.value);
    }
  });
  return investments;
}

const creditAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  creditAttributeBreakpoints,
  extractCreditAttributes,
  extractInvestmentAttributes,
};
