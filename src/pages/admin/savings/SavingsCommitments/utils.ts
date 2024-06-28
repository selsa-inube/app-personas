import { ICommitment } from "src/model/entity/product";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";

const validateCommitment = async (
  commitment: ICommitment[],
  commitmentId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentCommitment = [...commitment];

  if (currentCommitment.length === 0) {
    currentCommitment = await getSavingsCommitmentsForUser(
      userIdentification,
      accessToken,
    );
  }

  const selectedCommitment = currentCommitment.find((commitment) => {
    return commitment.id === commitmentId;
  });

  return {
    selectedCommitment,
    newCommitments: currentCommitment,
  };
};

const getNextPaymentData = (selectedProduct: ICommitment) => {
  const nextPaymentValue = selectedProduct.attributes.find(
    (attr) => attr.id === "quota_value",
  );

  return {
    nextPaymentValue: Number(nextPaymentValue?.value),
  };
};

export { getNextPaymentData, validateCommitment };
