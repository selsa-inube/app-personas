import { IProduct } from "src/model/entity/product";
import {
  getCreditsForUser,
  getMovementsForCredit,
} from "src/services/iclient/credits";
import { compareArraysByProperty } from "src/utils/arrays";
import { ISelectedProductState } from "./types";

const validateCreditsAndMovements = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string
) => {
  const allMovements = await getMovementsForCredit(creditId);

  let currentCredits = [...credits];

  if (credits.length === 0) {
    currentCredits = await getCreditsForUser(userIdentification);
  }

  const newCredits = currentCredits.map((credit) => {
    if (credit.id === creditId) {
      return {
        ...credit,
        movements: allMovements,
      };
    }

    return credit;
  });

  const selectedCredit = newCredits.find((credit) => credit.id === creditId);

  const lastMovements = allMovements.slice(0, 10);
  const previousLastMovements = selectedCredit?.movements?.slice(0, 10) || [];

  const equalFirstMovements = compareArraysByProperty(
    lastMovements,
    previousLastMovements,
    "id"
  );

  if (!equalFirstMovements) {
    console.error("Los movimientos no son iguales", {
      lastMovements,
      previousLastMovements,
    });
  }

  return {
    newCredits,
    selectedCredit,
  };
};

const addMovementsToCredit = (
  selectedProduct: ISelectedProductState,
  credits: IProduct[],
  creditId: string
) => {
  if (!selectedProduct.movements) return;

  const foundProduct = credits.find((credit) => credit.id === creditId);

  if (!foundProduct) return;

  return foundProduct.movements?.slice(
    selectedProduct.movements.length,
    selectedProduct.movements.length + 5
  );
};

export { addMovementsToCredit, validateCreditsAndMovements };
