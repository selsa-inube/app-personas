import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const quotaDetailsAttrs = [
  "available_space",
  "next_payment_value",
  "total_payment",
  "next_payment",
  "type",
  "payment_method",
  "assigned_quota",
];

const currentConsumptionAttrs = [
  "consumption_date",
  "consumption_value",
  "interest",
  "next_payment_interest",
  "total_payment_interest",
  "capital",
  "next_payment_capital",
  "total_payment",
  "total_payment_capital",
];

const quotaDetailsCurrencyAttrs = [
  "available_space",
  "next_payment_value",
  "total_payment_capital",
  "assigned_quota",
  "total_payment",
];

const currentConsumptionCurrencyAttrs = [
  "consumption_value",
  "next_payment_interest",
  "total_payment_interest",
  "next_payment_capital",
  "total_payment_capital",
];

function extractQuotaAttrs(quotaDetail: IProduct) {
  const foundAttributes = quotaDetail.attributes.filter((attribute) =>
    quotaDetailsAttrs.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => quotaDetailsAttrs.indexOf(a.id) - quotaDetailsAttrs.indexOf(b.id),
  );
}

function formatQuotaCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (quotaDetailsCurrencyAttrs.includes(attribute.id)) {
      return {
        ...attribute,
        value: !isNaN(Number(attribute.value))
          ? currencyFormat(Number(attribute.value))
          : attribute.value,
      };
    }
    return attribute;
  });
}

function extractNextPaymentValueDetailsAttrs(quotaDetail: IProduct) {
  return quotaDetail.attributes.filter((attribute) => {
    if (
      [
        "next_payment_capital",
        "min_interest",
        "min_past_due_interest",
        "min_penalty_interest",
        "min_life_insurance",
        "min_other_concepts",
        "next_payment_capitalization",
      ].includes(attribute.id)
    ) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
  });
}

function extractQuotaTotalDetailsAttrs(quotaDetail: IProduct) {
  return quotaDetail.attributes.filter((attribute) => {
    if (
      [
        "total_payment_capital",
        "total_interest",
        "total_past_due_interest",
        "total_penalty_interest",
        "total_life_insurance",
        "total_other_concepts",
        "total_payment_capitalization",
      ].includes(attribute.id)
    ) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
  });
}

function extractConsumptionAttrs(consumption: IProduct) {
  const foundAttributes = consumption.attributes.filter((attribute) =>
    currentConsumptionAttrs.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => quotaDetailsAttrs.indexOf(a.id) - quotaDetailsAttrs.indexOf(b.id),
  );
}

function formatCurrentConsumptionAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (currentConsumptionCurrencyAttrs.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

export {
  extractConsumptionAttrs,
  extractNextPaymentValueDetailsAttrs,
  extractQuotaAttrs,
  extractQuotaTotalDetailsAttrs,
  formatCurrentConsumptionAttrs,
  formatQuotaCurrencyAttrs,
};
