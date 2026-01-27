import { IProduct } from "src/model/entity/product";
import { getAmortizationForCredit } from "src/services/iclient/credits/getAmortization";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getMovementsForCredit } from "src/services/iclient/credits/getMovements";

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
  const nextCapital = selectedProduct.attributes.find(
    (attr) => attr.id === "next_capital",
  );

  const nextInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_interest",
  );

  const nextPastDueInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_past_due_interest",
  );

  const nextPenaltyInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "next_penalty_interest",
  );

  const nextLifeInsurance = selectedProduct.attributes.find(
    (attr) => attr.id === "next_life_insurance",
  );

  const nextOtherConcepts = selectedProduct.attributes.find(
    (attr) => attr.id === "next_other_concepts",
  );

  const nextCapitalization = selectedProduct.attributes.find(
    (attr) => attr.id === "next_capitalization",
  );

  const nextPaymentValue = selectedProduct.attributes.find(
    (attr) => attr.id === "next_payment_value",
  );

  return {
    nextCapital: nextCapital && Number(nextCapital?.value),
    nextInterest: nextInterest && Number(nextInterest?.value),
    nextPastDueInterest:
      nextPastDueInterest && Number(nextPastDueInterest?.value),
    nextPenaltyInterest:
      nextPenaltyInterest && Number(nextPenaltyInterest?.value),
    nextLifeInsurance: nextLifeInsurance && Number(nextLifeInsurance?.value),
    nextOtherConcepts: nextOtherConcepts && Number(nextOtherConcepts?.value),
    nextCapitalization: nextCapitalization && Number(nextCapitalization?.value),
    nextPaymentValue: Number(nextPaymentValue?.value || 0),
  };
};

const getExpiredPaymentData = (selectedProduct: IProduct) => {
  const expiredCapital = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_capital",
  );

  const expiredInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_interest",
  );

  const expiredPastDueInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_past_due_interest",
  );

  const expiredPenaltyInterest = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_penalty_interest",
  );

  const expiredLifeInsurance = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_life_insurance",
  );

  const expiredOtherConcepts = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_other_concepts",
  );

  const expiredCapitalization = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_capitalization",
  );

  const expiredValue = selectedProduct.attributes.find(
    (attr) => attr.id === "expired_value",
  );

  return {
    expiredCapital: expiredCapital && Number(expiredCapital?.value),
    expiredInterest: expiredInterest && Number(expiredInterest?.value),
    expiredPastDueInterest:
      expiredPastDueInterest && Number(expiredPastDueInterest?.value),
    expiredPenaltyInterest:
      expiredPenaltyInterest && Number(expiredPenaltyInterest?.value),
    expiredLifeInsurance:
      expiredLifeInsurance && Number(expiredLifeInsurance?.value),
    expiredOtherConcepts:
      expiredOtherConcepts && Number(expiredOtherConcepts?.value),
    expiredCapitalization:
      expiredCapitalization && Number(expiredCapitalization?.value),
    expiredValue: Number(expiredValue?.value || 0),
  };
};

const getCurrentPaymentData = (selectedProduct: IProduct) => {
  const next = getNextPaymentData(selectedProduct);
  const expired = getExpiredPaymentData(selectedProduct);

  const calculateCurrentValue = (
    nextValue: number | undefined,
    expiredValue: number | undefined,
  ) => {
    const calculated = (nextValue ?? 0) - (expiredValue ?? 0);
    return calculated !== 0 ? calculated : undefined;
  };

  return {
    currentCapital: calculateCurrentValue(
      next.nextCapital,
      expired.expiredCapital,
    ),
    currentInterest: calculateCurrentValue(
      next.nextInterest,
      expired.expiredInterest,
    ),
    currentPastDueInterest: calculateCurrentValue(
      next.nextPastDueInterest,
      expired.expiredPastDueInterest,
    ),
    currentPenaltyInterest: calculateCurrentValue(
      next.nextPenaltyInterest,
      expired.expiredPenaltyInterest,
    ),
    currentLifeInsurance: calculateCurrentValue(
      next.nextLifeInsurance,
      expired.expiredLifeInsurance,
    ),
    currentOtherConcepts: calculateCurrentValue(
      next.nextOtherConcepts,
      expired.expiredOtherConcepts,
    ),
    currentCapitalization: calculateCurrentValue(
      next.nextCapitalization,
      expired.expiredCapitalization,
    ),
    currentValue: calculateCurrentValue(
      next.nextPaymentValue,
      expired.expiredValue,
    ),
  };
};

export {
  getCurrentPaymentData,
  getExpiredPaymentData,
  getNextPaymentData,
  validateCredit,
  validateCreditMovementsAndAmortization,
};
