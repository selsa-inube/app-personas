import { IProduct } from "src/model/entity/product";
import { ISelectedProductState } from "./types";

const addMovementsToSaving = (
  selectedProduct: ISelectedProductState,
  saving: IProduct[],
  savingId: string,
) => {
  if (!selectedProduct.movements) return;

  const foundProduct = saving.find((saving) => saving.id === savingId);

  if (!foundProduct) return;

  return foundProduct.movements?.slice(
    selectedProduct.movements.length,
    selectedProduct.movements.length + 5,
  );
};

export { addMovementsToSaving };
