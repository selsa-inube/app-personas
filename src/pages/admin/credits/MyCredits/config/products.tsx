import { IAttribute, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/formats";

const myCreditAttributes = [
  "net_value",
  "next_payment_date",
  "next_payment_value",
];

const myCreditCurrencyAttributes = ["net_value", "next_payment_value"];

function extractMyCreditAttributes(credit: IProduct) {
  const foundAttributes = credit.attributes.filter((attribute) =>
    myCreditAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      myCreditAttributes.indexOf(a.id) - myCreditAttributes.indexOf(b.id)
  );
}

function formatMyCreditCurrencyAttrs(attributes: IAttribute[]) {
  return attributes.map((attribute) => {
    if (myCreditCurrencyAttributes.includes(attribute.id)) {
      return {
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      };
    }
    return attribute;
  });
}

const myCreditAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export {
  extractMyCreditAttributes,
  formatMyCreditCurrencyAttrs,
  myCreditAttributeBreakpoints,
};
