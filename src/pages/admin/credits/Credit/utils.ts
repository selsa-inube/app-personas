import { IProduct } from "src/model/entity/product";
import {
  getAmortizationForCredit,
  getCreditsForUser,
  getMovementsForCredit,
} from "src/services/iclient/credits";

const validateCredit = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentCredits = [...credits];

  if (currentCredits.length === 0) {
    currentCredits = await getCreditsForUser(userIdentification, accessToken);
  }

  const selectedCredit = currentCredits.find((credit) => {
    return credit.id === creditId;
  });

  return {
    selectedCredit,
    newCredits: currentCredits,
  };
};

const validateCreditMovementsAndAmortization = async (
  selectedCredit: IProduct,
  credits: IProduct[],
  accessToken: string,
) => {
  const currentCredits = [...credits];
  const newSelectedCredit = { ...selectedCredit };

  for (const ix in currentCredits) {
    if (currentCredits[ix].id === selectedCredit.id) {
      if (currentCredits[ix].movements?.length === 0) {
        const movements = await getMovementsForCredit(
          selectedCredit.id,
          accessToken,
        );
        currentCredits[ix].movements = movements;
      }

      newSelectedCredit.movements = currentCredits[ix].movements?.slice(0, 5);

      if (currentCredits[ix].amortization?.length === 0) {
        const amortization = await getAmortizationForCredit(
          selectedCredit.id,
          accessToken,
        );

        currentCredits[ix].amortization = amortization;
      }

      break;
    }
  }

  return {
    newSelectedCredit,
    newCredits: currentCredits,
  };
};

const getNextPaymentData = (selectedProduct: IProduct) => {
  const nextPaymentCapital = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_capital",
  );

  const nextPaymentInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_interest",
  );

  const nextPaymentArrearsInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_arrears_interest",
  );

  const nextPaymentValue = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_value",
  );

  return {
    nextPaymentCapital: nextPaymentCapital && Number(nextPaymentCapital?.value),
    nextPaymentInterest:
      nextPaymentInterest && Number(nextPaymentInterest?.value),
    nextPaymentArrearsInterest:
      nextPaymentArrearsInterest && Number(nextPaymentArrearsInterest?.value),
    nextPaymentValue: Number(nextPaymentValue?.value),
  };
};

export {
  getNextPaymentData,
  validateCredit,
  validateCreditMovementsAndAmortization,
};
