import { ECommitmentType, ICommitment } from "src/model/entity/product";

const savingsCommitmentsAttributes: Record<string, string[]> = {
  [ECommitmentType.QUOTAESTATUTORY]: [
    "next_payment",
    "commitment_value",
    "payment_method",
  ],
  [ECommitmentType.SAVINGSPROGRAMMED]: ["next_payment", "payment_method"],
};

function extractSavingsCommitmentsAttributes(commitment: ICommitment) {
  const commitmentType = commitment.type;

  const foundAttributes = commitment.attributes.filter((attribute) =>
    savingsCommitmentsAttributes[commitmentType].includes(attribute.id),
  );

  return foundAttributes.sort(
    (a, b) =>
      savingsCommitmentsAttributes[commitmentType].indexOf(a.id) -
      savingsCommitmentsAttributes[commitmentType].indexOf(b.id),
  );
}

export { extractSavingsCommitmentsAttributes };
