import { ISavingsState } from "src/context/savings/types";
import { IMovement } from "src/model/entity/product";
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

  const selectedSaving = combinedSavings.find((saving) => {
    return saving.id === savingId;
  });

  return {
    selectedSaving,
    newSavings: currentSaving,
    combinedSavings,
  };
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

export { validateSaving, generateAttributes };
