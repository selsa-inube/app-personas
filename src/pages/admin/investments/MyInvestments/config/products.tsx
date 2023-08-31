import { IAttribute, IProduct } from "@ptypes/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const myInvestmentAttributes = ["expiration_date", "investment_value"];
const myinvestmentCurrencyAttributes = ["investment_value"];

function extractMyInvestmentAttributes(investment: IProduct) {
  const foundAttributes = investment.attributes.filter((attribute) =>
    myInvestmentAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      myInvestmentAttributes.indexOf(a.id) -
      myInvestmentAttributes.indexOf(b.id)
  );
}

function formatMyInvestmentCurrencyAttrs(investment: IAttribute[]) {
  return investment.map((investment) => {
    if (myinvestmentCurrencyAttributes.includes(investment.id)) {
      return {
        ...investment,
        value: currencyFormat(Number(investment.value)),
      };
    }
    return investment;
  });
}

const myInvestmentAttributeBreakpoints = {
  "(min-width: 280px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  extractMyInvestmentAttributes,
  formatMyInvestmentCurrencyAttrs,
  myInvestmentAttributeBreakpoints,
};
