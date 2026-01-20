import { IAttribute, ICommitment, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const attributesProducts = ["net_value"];

function extractProductAttributes(product: IProduct) {
  const foundAttributes = product.attributes.filter((attribute) =>
    attributesProducts.includes(attribute.id),
  );
  return foundAttributes
    .sort((a, b) => attributesProducts.indexOf(a.id) - attributesProducts.indexOf(b.id))
}

function formatProductCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (attributesProducts.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

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

const cardCurrencyAttributes = ["used_quota"];

function extractCardAttributes(card: IProduct) {
  const foundAttributes = card.attributes.filter((attribute) =>
    cardAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => cardAttributes.indexOf(a.id) - cardAttributes.indexOf(b.id),
  );
}

function extractCardAttributesWithUsedQuota(
  card: IProduct,
  creditQuotas: IProduct[]
) {
  const cardQuotas = creditQuotas.filter((quota) =>
    card.quotaDetails?.includes(quota.id)
  );
  const usedQuota = cardQuotas.reduce((total, quota) => {
    const assignedQuota = quota.attributes.find((attr) => attr.id === "assigned_quota");
    const availableSpace = quota.attributes.find((attr) => attr.id === "available_space");

    if (assignedQuota && availableSpace) {
      const used = Number(assignedQuota.value) - Number(availableSpace.value);
      return total + (isNaN(used) ? 0 : used);
    }
    return total;
  }, 0);

  return [{
    id: "used_quota",
    label: "Deuda total",
    value: usedQuota,
  }];
}

function formatCardCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (cardCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
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

function sumUsedQuota(cards: IProduct[]) {
  return currencyFormat(
    cards.reduce((total, card) => {
      const assignedQuota = card.attributes.find((attr) => attr.id === "assigned_quota");
      const availableSpace = card.attributes.find((attr) => attr.id === "available_space");

      if (assignedQuota && availableSpace) {
        const used = Number(assignedQuota.value) - Number(availableSpace.value);
        return total + (isNaN(used) ? 0 : used);
      }
      return total;
    }, 0)
  );
}

function sumCommitmentNextPaymentValue(commitments: ICommitment[]) {
  return currencyFormat(
    commitments.reduce((total, commitment) => {
      const nextPaymentValue = commitment.attributes.find((attr) => attr.id === "next_payment_value");
      if (nextPaymentValue) {
        const value = Number(nextPaymentValue.value);
        return total + (isNaN(value) ? 0 : value);
      }
      return total;
    }, 0)
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
  extractProductAttributes,
  formatProductCurrencyAttrs,
  extractCardAttributes,
  extractCardAttributesWithUsedQuota,
  formatCardCurrencyAttrs,
  extractCreditAttributes,
  formatCreditCurrencyAttrs,
  extractInvestmentAttributes,
  formatInvestmentCurrencyAttrs,
  extractSavingsAttributes,
  formatSavingsCurrencyAttrs,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
  sumNetValue,
  sumUsedQuota,
  sumCommitmentNextPaymentValue,
};