import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const quotaDetailsAttrs = [
  "available_space",
  "next_payment_value",
  "full_payment",
  "next_payment_date",
  "type",
  "payment_method",
  "assigned_quota",
];

const currentConsumptionAttrs = [
  "consumption_date",
  "consumption_value",
  "current_interest",
  "min_payment_quota_available",
  "total_payment_quota_available",
  "capital_payment",
  "min_capital_payment",
  "total_capital_payment",
];

const quotaDetailsCurrencyAttrs = [
  "available_space",
  "next_payment_value",
  "full_payment",
  "assigned_quota",
];

const currentConsumptionCurrencyAttrs = [
  "consumption_value",
  "min_payment_quota_available",
  "total_payment_quota_available",
  "min_capital_payment",
  "total_capital_payment",
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
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

function extractNextPaymentValueDetailsAttrs(quotaDetail: IProduct) {
  return quotaDetail.attributes.filter((attribute) => {
    if (
      [
        "min_capital_payment",
        "min_current_interest",
        "min_arrears_interest",
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
        "total_capital_payment",
        "total_current_interest",
        "total_arrears_interest",
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
  extractQuotaAttrs,
  extractNextPaymentValueDetailsAttrs,
  extractQuotaTotalDetailsAttrs,
  formatQuotaCurrencyAttrs,
  formatCurrentConsumptionAttrs,
  extractConsumptionAttrs,
};
