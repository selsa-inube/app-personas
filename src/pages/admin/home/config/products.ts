import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const creditAttributes = [
  "net_value",
  "next_payment_date",
  "next_payment_value",
];

const creditCurrencyAttributes = ["net_value", "next_payment_value"];

function extractCreditAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => creditAttributes.indexOf(a.id) - creditAttributes.indexOf(b.id),
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

const investmentAttributes = ["expiration_date", "net_value"];
const investmentCurrencyAttributes = ["net_value"];

function extractInvestmentAttributes(investment: IProduct) {
  const foundAttributes = investment.attributes.filter((attribute) =>
    investmentAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      investmentAttributes.indexOf(a.id) - investmentAttributes.indexOf(b.id),
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

const savingAttributes = ["net_value"];

const savingCurrencyAttributes = ["net_value"];

function extractSavingAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    savingAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => savingAttributes.indexOf(a.id) - savingAttributes.indexOf(b.id),
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

function sumNetValue(savingsStatutoryContributions: IProduct[]) {
  let total = 0;
  for (const product of savingsStatutoryContributions) {
    for (const attribute of product.attributes) {
      if (attribute.id === "net_value") {
        total += Number(attribute.value);
      }
    }
  }
  return currencyFormat(total);
}

const creditAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

const investmentAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

const savingAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  creditAttributeBreakpoints,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
  extractCreditAttributes,
  extractInvestmentAttributes,
  extractSavingAttributes,
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
  formatSavingCurrencyAttrs,
  sumNetValue,
};
