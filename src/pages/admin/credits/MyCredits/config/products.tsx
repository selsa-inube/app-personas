import { IProduct } from "src/types/pages/product.types";
import { currencyFormat } from "src/utils/formats";

const myCreditAttributes = [
  "next_payment_value",
  "next_payment_date",
  "net_value",
];

function extractMyCreditAttributes(credit: IProduct) {
  const attributes = credit.attributes.filter((attribute) =>
    myCreditAttributes.includes(attribute.id)
  );
  attributes.forEach((attribute) => {
    if (typeof attribute.value === "number") {
      attribute.value = currencyFormat(attribute.value);
    }
  });
  return attributes;
}

const myCreditAttributeBreakpoints = {
  "(min-width: 1100px)": 3,
  "(min-width: 950px)": 2,
  "(min-width: 895px)": 1,
  "(min-width: 750px)": 3,
  "(min-width: 650px)": 2,
  "(max-width: 660px)": 1,
};

export { extractMyCreditAttributes, myCreditAttributeBreakpoints };
