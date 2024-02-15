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

  const selectedCommitments = currentCommitment.find((commitment) => {
    return commitment.id === commitmentId;
  });

  return {
    selectedCommitments,
    newCommitments: currentCommitment,
  };
};

const getNextPaymentData = (selectedProduct: ICommitment) => {
  const nextPaymentValue = selectedProduct.attributes.find(
    (attr) => attr.id === "value_to_pay",
  );

  return {
    nextPaymentValue: Number(nextPaymentValue?.value),
  };
};

export { validateCommitment, getNextPaymentData };
