import { IAttribute, IProduct } from "@ptypes/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const creditAttributes = [
  "net_value",
  "next_payment_date",
  "next_payment_value",
];

const creditCurrencyAttributes = ["net_value", "next_payment_value"];

function extractCreditAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) => creditAttributes.indexOf(a.id) - creditAttributes.indexOf(b.id)
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

const investmentAttributes = ["expiration_date", "investment_value"];
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
