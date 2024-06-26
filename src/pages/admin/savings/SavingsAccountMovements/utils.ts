import { ISavingsState } from "src/context/savings/types";
import { ISelectedProductState } from "./types";
import { IMovement } from "src/model/entity/product";

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

const staticAttributes = [
  { id: "date", label: "Fecha", value: "" },
  { id: "reference", label: "Referencia", value: "" },
];

const generateAttributes = (movement: IMovement) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: movement[attr.id as keyof IMovement] as string | number | Date,
  }));

export { addMovementsToSaving, generateAttributes };
