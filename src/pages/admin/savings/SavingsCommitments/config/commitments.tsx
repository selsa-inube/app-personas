import { IAttribute, ICommitment } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

const savingsCommitmentsAttributes = [
  "next_pay_date",
  "due_date",
  "pay_method",
  "periodicity",
];
const savingsCommitmentsCurrencyAttributes = ["value_to_pay"];

function extractSavingsCommitmentsAttributes(commitment: ICommitment) {
  const foundAttributes = commitment.attributes.filter((attribute) =>
    savingsCommitmentsAttributes.includes(attribute.id)
  );

  return foundAttributes.sort(
    (a, b) =>
      savingsCommitmentsAttributes.indexOf(a.id) -
      savingsCommitmentsAttributes.indexOf(b.id)
  );
}

function formatSavingCommitmentsCurrencyAttrs(commitment: IAttribute[]) {
  return commitment.map((commitment) => {
    if (savingsCommitmentsCurrencyAttributes.includes(commitment.id)) {
      return {
        ...commitment,
        value: currencyFormat(Number(commitment.value)),
      };
    }
    return commitment;
  });
}

export {
  extractSavingsCommitmentsAttributes,
  formatSavingCommitmentsCurrencyAttrs,
};
