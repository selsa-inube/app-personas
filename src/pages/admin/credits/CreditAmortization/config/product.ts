import { IProduct } from "src/types/pages/product.types";

const creditAmortizationAttrs = ["interest_rate", "terms"];

function extractCreditAmortizationAttrs(credit: IProduct) {
  return credit.attributes.filter((attribute) =>
    creditAmortizationAttrs.includes(attribute.id)
  );
}

export { extractCreditAmortizationAttrs };
