import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const mySavingsAttributes = ["net_value"];

const mySavingsCurrencyAttributes = ["net_value", "min_value"];

function extractMySavingsAttributes(saving: IProduct) {
  const foundAttributes = saving.attributes.filter((attribute) =>
    mySavingsAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      mySavingsAttributes.indexOf(a.id) - mySavingsAttributes.indexOf(b.id),
  );
}

function formatMySavingsCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (mySavingsCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

const mySavingsAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
};
