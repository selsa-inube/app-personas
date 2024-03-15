import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const quotaDetailsAttrs = [
  "available_space",
  "min_payment",
  "full_payment",
  "next_payment_date",
  "type",
  "payment_method",
  "assigned_quota",
];

const quotaDetailsCurrencyAttrs = [
  "available_space",
  "min_payment",
  "full_payment",
  "assigned_quota",
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

function extractQuotaMinDetailsAttrs(quotaDetail: IProduct) {
  return quotaDetail.attributes.filter((attribute) => {
    if (
      [
        "min_capital_payment",
        "min_current_interest",
        "min_arrears_interest",
        "min_handling_fee",
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
        "total_handling_fee",
      ].includes(attribute.id)
    ) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
  });
}

export {
  extractQuotaAttrs,
  extractQuotaMinDetailsAttrs,
  extractQuotaTotalDetailsAttrs,
  formatQuotaCurrencyAttrs,
};
