import { ICommitment, IMovement } from "src/model/entity/product";
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
    (attr) => attr.id === "next_payment_value",
  );

  return {
    nextPaymentValue: Number(nextPaymentValue?.value),
  };
};

const staticAttributes = [
  { id: "date", label: "Fecha", value: "" },
  { id: "reference", label: "Referencia", value: "" },
];

const generateAttributes = (movement: IMovement) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: movement[attr.id as keyof IMovement] as string | number | Date,
  }));

export { getNextPaymentData, validateCommitment, generateAttributes };
