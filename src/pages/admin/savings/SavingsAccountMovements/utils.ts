import { ISavingsState } from "src/context/savings/types";
import { ISelectedProductState } from "./types";

const addMovementsToSaving = (
  selectedProduct: ISelectedProductState,
  savings: ISavingsState,
  savingId: string,
) => {
  if (!selectedProduct.movements) return;

  const combinedSavings = [
    ...savings.savingsAccounts,
    ...savings.programmedSavings,
    ...savings.savingsContributions,
    ...savings.cdats,
  ];

  const foundProduct = combinedSavings.find((saving) => saving.id === savingId);

  if (!foundProduct) return;

  return foundProduct.movements?.slice(
    selectedProduct.movements.length,
    selectedProduct.movements.length + 5,
  );
};

export { addMovementsToSaving };
