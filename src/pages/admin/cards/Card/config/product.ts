import { EMovementType, IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const cardAttributes = [
  "card_number",
  "cardholder",
  "status",
  "savings_accounts",
  "handling_fee",
  "commissions",
];

const creditQuotasAttributes = [
  "available_space",
  "next_payment_date",
  "next_payment_value",
  "type",
  "payment_method",
  "assigned_quota",
];

const creditQuotasCurrencyAttributes = [
  "available_space",
  "next_payment_value",
  "assigned_quota",
];

const cardCurrencyAttributes = ["handling_fee"];

function extractCardAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    cardAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) => cardAttributes.indexOf(a.id) - cardAttributes.indexOf(b.id),
  );
}

function extractCreditQuotasAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    creditQuotasAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      creditQuotasAttributes.indexOf(a.id) -
      creditQuotasAttributes.indexOf(b.id),
  );
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

function formatCreditQuotasCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (creditQuotasCurrencyAttributes.includes(attribute.id)) {
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

function prefix(description: string) {
  const text = description.split(" ");
  if (text.length > 0) {
    const word = text[0];
    return word === "Compra" || word === "compra" ? "" : "Compra";
  }
  return;
}

function getMovementDescriptionType(
  type?: EMovementType,
  description?: string,
): string {
  switch (type) {
    case EMovementType.PURCHASE:
      return `${description && prefix(description)}`;
    case EMovementType.REVERSE:
      return "Reverso";
    case EMovementType.PAYMENT:
      return "Pago";
    default:
      return "";
  }
}

export {
  extractCardAttributes,
  extractCreditQuotasAttributes,
  formatCardCurrencyAttrs,
  formatCreditQuotasCurrencyAttrs,
  getMovementDescriptionType,
};
