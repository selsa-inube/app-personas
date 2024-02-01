import { IProduct } from "src/model/entity/product";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";

const validateSaving = async (
  saving: IProduct[],
  savingId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentSaving = [...saving];

  if (currentSaving.length === 0) {
    currentSaving = await getSavingsForUser(userIdentification, accessToken);
  }

  const selectedSavings = currentSaving.find((saving) => {
    return saving.id === savingId;
  });

  return {
    selectedSavings,
    newSavings: currentSaving,
  };
};

export { validateSaving };
