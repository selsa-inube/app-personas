import { IProduct } from "src/model/entity/product";
import { getCreditsForUser } from "src/services/iclient/credits";

const validateCredits = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string,
  accessToken: string
) => {
  let currentCredits = [...credits];

  if (credits.length === 0) {
    currentCredits = await getCreditsForUser(userIdentification, accessToken);
  }

  const selectedCredit = currentCredits.find(
    (credit) => credit.id === creditId
  );

  return {
    selectedCredit,
    newCredits: currentCredits,
  };
};

const getNextPaymentData = (selectedProduct: IProduct) => {
  const nextPaymentCapital = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_capital"
  );

  const nextPaymentInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_interest"
  );

  const nextPaymentValue = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_value"
  );

  return {
    nextPaymentCapital: Number(nextPaymentCapital?.value),
    nextPaymentInterest: Number(nextPaymentInterest?.value),
    nextPaymentValue: Number(nextPaymentValue?.value),
  };
};

export { getNextPaymentData, validateCredits };
