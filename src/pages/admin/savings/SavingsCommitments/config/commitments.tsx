import { ICommitment, ECommitmentType } from "src/model/entity/product";

const savingsCommitmentsAttributes: Record<string, string[]> = {
  [ECommitmentType.QUOTAESTATUTORY]: [
    "next_pay_date",
    "contribution_value",
    "pay_method",
  ],
  [ECommitmentType.SAVINGSPROGRAMMED]: ["next_pay_date", "pay_method"],
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
