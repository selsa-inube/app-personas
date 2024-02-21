import { ICommitment } from "src/model/entity/product";

const savingsCommitmentsAttributes = [
  "next_pay_date",
  "due_date",
  "pay_method",
  "periodicity",
];

function extractSavingsCommitmentsAttributes(commitment: ICommitment) {
  const foundAttributes = commitment.attributes.filter((attribute) =>
    savingsCommitmentsAttributes.includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      savingsCommitmentsAttributes.indexOf(a.id) -
      savingsCommitmentsAttributes.indexOf(b.id),
  );
}

export { extractSavingsCommitmentsAttributes };
