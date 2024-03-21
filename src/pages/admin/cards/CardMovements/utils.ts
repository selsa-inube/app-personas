import { IProduct } from "src/model/entity/product";
import { getCreditQuotasForUser } from "src/services/iclient/cards/creditQuotas";
import { ISelectedProductState } from "./types";

const validateCreditQuotas = async (
  creditQuotas: IProduct[],
  cardId: string,
  creditQuotaId: string,
  accessToken: string,
) => {
  let currentyCreditQuotas = [...creditQuotas];

  if (currentyCreditQuotas.length === 0) {
    currentyCreditQuotas = await getCreditQuotasForUser(cardId, accessToken);
  }

  const selectCreditQuotas = currentyCreditQuotas.find((creditQuota) => {
    return creditQuota.id === creditQuotaId;
  });

  return {
    selectCreditQuotas,
    newCreditQuotas: currentyCreditQuotas,
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

export { validateCreditQuotas, addMovementsToCard };
