import { IProduct } from "src/model/entity/product";

import { ISelectedProductState } from "./types";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getMovementsForCredit } from "src/services/iclient/credits/getMovements";

const validateCreditsAndMovements = async (
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
      if (currentCredits[ix].movements?.length === 0) {
        const movements = await getMovementsForCredit(creditId, accessToken);
        currentCredits[ix].movements = movements;
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

const addMovementsToCredit = (
  selectedProduct: ISelectedProductState,
  credits: IProduct[],
  creditId: string,
) => {
  if (!selectedProduct.movements) return;

  const foundProduct = credits.find((credit) => credit.id === creditId);

  if (!foundProduct) return;

  return foundProduct.movements?.slice(
    selectedProduct.movements.length,
    selectedProduct.movements.length + 5,
  );
};

export { addMovementsToCredit, validateCreditsAndMovements };
