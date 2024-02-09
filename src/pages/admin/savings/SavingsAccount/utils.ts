import { ISavingsState } from "src/context/savings/types";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";

const validateSaving = async (
  savings: ISavingsState,
  savingId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentSaving = { ...savings };

  const currentCombinedSavings = [
    ...currentSaving.savingsAccounts,
    ...currentSaving.programmedSavings,
    ...currentSaving.savingsContributions,
    ...currentSaving.cdats,
  ];

  if (currentCombinedSavings.length === 0) {
    currentSaving = await getSavingsForUser(userIdentification, accessToken);
  }

  const combinedSavings = [
    ...currentSaving.savingsAccounts,
    ...currentSaving.programmedSavings,
    ...currentSaving.savingsContributions,
    ...currentSaving.cdats,
  ];

  const selectedSavings = combinedSavings.find((saving) => {
    return saving.id === savingId;
  });

  return {
    selectedSavings,
    newSavings: currentSaving,
    combinedSavings,
  };
};

export { validateSaving };
