import { IProduct } from "@ptypes/pages/product.types";

const myInvestmentAttributes = [
  "investment_value"
];

function extractMyInvestmentAttributes(investment: IProduct) {
  return investment.attributes.filter((attribute) =>
    myInvestmentAttributes.includes(attribute.id)
  );
}

const myInvestmentAttributeBreakpoints = {
  "(min-width: 280px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export { extractMyInvestmentAttributes, myInvestmentAttributeBreakpoints };
