import { IProduct, IAttribute } from "@ptypes/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const creditAttributes = [
  "next_payment_value",
  "next_payment_date",
  "net_value",
];

const creditCurrencyAttributes = ["net_value", "next_payment_value"];

function extractCreditAttributes(credit: IProduct) {
  return credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id)
  );
}

function formatCreditCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (creditCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

const investmentAttributes = ["investment_value"];
const investmentCurrencyAttributes = ["investment_value"];

function extractInvestmentAttributes(investment: IProduct) {
  return investment.attributes.filter((attribute) =>
    investmentAttributes.includes(attribute.id)
  );
}

function formatInvestmentCurrencyAttrs(investment: IAttribute[]) {
  return investment.map((investment) => {
    if (investmentCurrencyAttributes.includes(investment.id)) {
      return {
        ...investment,
        value: currencyFormat(Number(investment.value)),
      };
    }
    return investment;
  });
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
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
};
