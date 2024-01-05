import { IProduct } from "src/model/entity/product";
import {
  getAmortizationForCredit,
  getCreditsForUser,
} from "src/services/iclient/credits";
import { addMovementsToCredit } from "../CreditMovements/utils";

const validateCreditsAndAmortization = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string,
  accessToken: string
) => {
  let currentCredits = [...credits];

  if (credits.length === 0) {
    const newCredits = await getCreditsForUser(userIdentification, accessToken);

    const allAmortization = await getAmortizationForCredit(
      creditId,
      accessToken
    );

    currentCredits = newCredits.map((credit) => {
      if (credit.id === creditId) {
        return {
          ...credit,
          amortization: allAmortization,
        };
      }

      return credit;
    });
  }

  const selectedCredit = currentCredits.find(
    (credit) => credit.id === creditId
  );

  return {
    newCredits: currentCredits,
    selectedCredit,
  };
};

export { addMovementsToCredit, validateCreditsAndAmortization };
