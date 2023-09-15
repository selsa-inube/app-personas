import { IProduct } from "src/model/entity/product";

const creditAmortizationAttrs = ["interest_rate", "terms"];

function extractCreditAmortizationAttrs(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    creditAmortizationAttrs.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      creditAmortizationAttrs.indexOf(a.id) -
      creditAmortizationAttrs.indexOf(b.id)
  );
}

export { extractCreditAmortizationAttrs };
