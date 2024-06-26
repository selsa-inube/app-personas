import { IMovement, IProduct } from "src/model/entity/product";
import { getCreditQuotasForCard } from "src/services/iclient/cards/getCreditQuotas";
import { ISelectedProductState } from "./types";

const validateCreditQuotas = async (
  creditQuotas: IProduct[],
  cardId: string,
  creditQuotaId: string,
  accessToken: string,
) => {
  let currentCreditQuotas = [...creditQuotas];

  if (currentCreditQuotas.length === 0) {
    currentCreditQuotas = await getCreditQuotasForCard(cardId, accessToken);
  }

  const selectCreditQuotas = currentCreditQuotas.find((creditQuota) => {
    return creditQuota.id === creditQuotaId;
  });

  return {
    selectCreditQuotas,
    newCreditQuotas: currentCreditQuotas,
  };
};

const addMovementsToCard = (
  selectedProduct: ISelectedProductState,
  creditMovements: IProduct[],
  cardId: string,
) => {
  if (!selectedProduct.movements) return;

  const foundProduct = creditMovements.find((card) => card.id === cardId);

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

export { addMovementsToCard, validateCreditQuotas, generateAttributes };
