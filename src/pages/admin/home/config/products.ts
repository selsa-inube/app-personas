import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const creditAttributes = ["total_value", "next_payment", "next_payment_value"];

const creditCurrencyAttributes = ["total_value", "next_payment_value"];

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

const mySavingsAttributes = ["net_value"];

const mySavingsCurrencyAttributes = ["net_value", "min_value"];

function extractSavingsAttributes(saving: IProduct) {
  const foundAttributes = saving.attributes.filter((attribute) =>
    mySavingsAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      mySavingsAttributes.indexOf(a.id) - mySavingsAttributes.indexOf(b.id),
  );
}

function formatSavingsCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (mySavingsCurrencyAttributes.includes(attribute.id)) {
      const valueNumber = Number(attribute.value);
      return {
        ...attribute,
        value: isNaN(valueNumber) ? "Por definir" : currencyFormat(valueNumber),
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

const cardAttributes = ["status"];

function extractCardAttributes(card: IProduct) {
  const foundAttributes = card.attributes.filter((attribute) =>
    cardAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => cardAttributes.indexOf(a.id) - cardAttributes.indexOf(b.id),
  );
}

function sumNetValue(savingsProducts: IProduct[]) {
  let total = 0;
  for (const product of savingsProducts) {
    for (const attribute of product.attributes) {
      if (attribute.id === "net_value") {
        const value = Number(attribute.value);
        if (!isNaN(value)) {
          total += value;
        }
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

const savingAttributeBreakpoints = {
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

const cardAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  cardAttributeBreakpoints,
  creditAttributeBreakpoints,
  extractCardAttributes,
  extractCreditAttributes,
  extractInvestmentAttributes,
  extractSavingsAttributes,
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
  formatSavingsCurrencyAttrs,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
  sumNetValue,
};
