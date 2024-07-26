import { IProduct } from "src/model/entity/product";

import { getAmortizationForCredit } from "src/services/iclient/credits/getAmortization";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { addMovementsToCredit } from "../CreditMovements/utils";

const validateCreditsAndAmortization = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentCredits = [...credits];

  if (credits.length === 0) {
    currentCredits = await getCreditsForUser(userIdentification, accessToken);
  }

  let selectedCredit: IProduct | undefined;

  for (const ix in currentCredits) {
    if (currentCredits[ix].id === creditId) {
      if (currentCredits[ix].amortization?.length === 0) {
        const amortization = await getAmortizationForCredit(
          creditId,
          accessToken,
        );

        currentCredits[ix].amortization = amortization;
      }

      selectedCredit = currentCredits[ix];

      break;
    }
  }

  return {
    newCredits: currentCredits,
    selectedCredit,
  };
};

export { addMovementsToCredit, validateCreditsAndAmortization };
