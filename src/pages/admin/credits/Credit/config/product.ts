import { IAttribute, IProduct } from "src/types/pages/product.types";

const creditAttributes = [
  "loan_date",
  "loan_value",
  "next_due_date",
  "next_payment_value",
  "quote",
  "peridiocity",
  "payment_means",
  "interest_rate",
];

const creditCurrencyAttributes = ["loan_value", "next_payment_value"];

function extractCreditAttributes(credit: IProduct) {
  return credit.attributes.filter((attribute) =>
    creditAttributes.includes(attribute.id)
  );
}

const currencyFormat = (price: number): string => {
  return (
    "$ " +
    price.toLocaleString("es-CO", {
      currency: "COP",
    })
  );
};

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

export { extractCreditAttributes, formatCreditCurrencyAttrs };
