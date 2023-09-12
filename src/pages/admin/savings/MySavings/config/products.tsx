import { IAttribute, IProduct } from "src/types/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const mySavingsAttributes = ["net_value"];

const mySavingsCurrencyAttributes = ["net_value"];

function extractMySavingsAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    mySavingsAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      mySavingsAttributes.indexOf(a.id) - mySavingsAttributes.indexOf(b.id)
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

function truncateAndObfuscateDescription(description: string, type: string) {
  if (type === "CA") {
    const lastFourCharacters = description.slice(-4);
    return "**" + lastFourCharacters;
  } else {
    return description;
  }
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
  truncateAndObfuscateDescription,
};
