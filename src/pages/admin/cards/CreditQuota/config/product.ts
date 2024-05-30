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
  "min_payment_quota_available",
  "total_payment_quota_available",
  "capital",
  "min_capital",
  "total_payment",
];

const quotaDetailsCurrencyAttrs = [
  "available_space",
  "next_payment_value",
  "total_capital",
  "assigned_quota",
];

const currentConsumptionCurrencyAttrs = [
  "consumption_value",
  "min_payment_quota_available",
  "total_payment_quota_available",
  "min_capital",
  "total_capital",
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
        "min_capital",
        "min_interest",
        "min_past_due_interest",
        "min_penalty_interest",
        "min_life_insurance",
        "min_other_concepts",
        "min_capitalization",
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
        "total_capital",
        "total_interest",
        "total_past_due_interest",
        "total_penalty_interest",
        "total_life_insurance",
        "total_other_concepts",
        "total_capitalization",
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
