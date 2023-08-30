import { IProduct } from "@ptypes/pages/product.types";

const creditAttributes = [
  "next_payment_value",
  "next_payment_date",
  "net_value",
];

function extractCreditAttributes(credit: IProduct) {
  return credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id)
  );
}

const investmentAttributes = ["expiration_date", "investment_value"];

function extractInvestmentAttributes(investment: IProduct) {
  return investment.attributes.filter((attribute) =>
    investmentAttributes.includes(attribute.id)
  );
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
