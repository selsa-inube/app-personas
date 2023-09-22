import { IAttribute, ICommitment } from "src/model/entity/product";
import { currencyFormat } from "src/utils/formats";

const myCommitmentAttributes = ["value_to_pay"];
const mycommitmentCurrencyAttributes = ["value_to_pay"];

function extractMyCommitmentAttributes(commitment: ICommitment) {
  const foundAttributes = commitment.attributes.filter((attribute) =>
    myCommitmentAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      myCommitmentAttributes.indexOf(a.id) -
      myCommitmentAttributes.indexOf(b.id)
  );
}

function formatMyCommitmentCurrencyAttrs(commitment: IAttribute[]) {
  return commitment.map((commitment) => {
    if (mycommitmentCurrencyAttributes.includes(commitment.id)) {
      return {
        ...commitment,
        value: currencyFormat(Number(commitment.value)),
      };
    }
    return commitment;
  });
}

export { extractMyCommitmentAttributes, formatMyCommitmentCurrencyAttrs };
