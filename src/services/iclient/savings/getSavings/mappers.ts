import { ISavingsState } from "src/context/savings/types";
import {
  EMovementType,
  EProductType,
  IMovement,
  IProduct,
} from "src/model/entity/product";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";
import { getProductAttributes, getProductDetails } from "./utils";

const mapSavingProductCommitmentApiToEntity = (
  commitment: Record<string, string>,
): string => {
  return commitment.commitmentNumber;
};

const mapSavingProductsCommitmentsApiToEntities = (
  commitments: Record<string, string>[],
): string[] => {
  return commitments.map(mapSavingProductCommitmentApiToEntity);
};

const mapSavingProductMovementsApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  let type: EMovementType | undefined;

  if (Object(movement).creditMovementPesos > 0) {
    type = EMovementType.CREDIT;
  } else if (Object(movement).debitMovementPesos > 0) {
    type = EMovementType.DEBIT;
  } else {
    type = undefined;
  }

  return {
    id: String(movement.movementId),
    date: String(movement.movementDate),
    reference: String(movement.movementNumber),
    description: capitalizeEachWord(String(movement.movementDescription)),
    totalValue: Number(
      movement.creditMovementPesos || movement.debitMovementPesos || 0,
    ),
    type: type,
  };
};

const mapSavingProductMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements.map(mapSavingProductMovementsApiToEntity).sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }

    const referenceA = a.reference || "";
    const referenceB = b.reference || "";

    return referenceA.localeCompare(referenceB);
  });
};

const mapSavingsApiToEntity = (
  saving: Record<string, string | number | object>,
): IProduct => {
  const productType: EProductType = Object(saving.productType).code;

  const movements = Array.isArray(saving.lastMovementTheSavingProducts)
    ? mapSavingProductMovementsApiToEntities(
        saving.lastMovementTheSavingProducts,
      )
    : [];

  const attributes = getProductAttributes(productType, saving);

  const { title, description } = getProductDetails(
    productType,
    capitalizeText(String(saving.productDescription).toLowerCase()),
    String(saving.productNumber),
  );

  return {
    id: String(saving.productNumber),
    title,
    description,
    type: productType,
    attributes,
    movements: movements,
    amortization: [],
    tags: [],
    commitments: mapSavingProductsCommitmentsApiToEntities(
      Array.isArray(saving.productsCommitmentRelationship)
        ? saving.productsCommitmentRelationship
        : [],
    ),
  };
};

const mapSavingsApiToEntities = (
  savings: Record<string, string | number | object>[],
): ISavingsState => {
  const savingsAccounts: IProduct[] = [];
  const programmedSavings: IProduct[] = [];
  const savingsContributions: IProduct[] = [];
  const cdats: IProduct[] = [];

  savings
    .map((saving) => mapSavingsApiToEntity(saving))
    .map((saving) => {
      switch (saving.type) {
        case EProductType.VIEWSAVINGS:
          savingsAccounts.push(saving);
          break;
        case EProductType.PROGRAMMEDSAVINGS:
          programmedSavings.push(saving);
          break;
        case EProductType.PERMANENTSAVINGS:
          savingsContributions.push(saving);
          break;
        case EProductType.CONTRIBUTIONS:
          savingsContributions.push(saving);
          break;
        case EProductType.CDAT:
          cdats.push(saving);
          break;
      }
    });

  return {
    savingsAccounts: savingsAccounts.sort((a, b) => a.id.localeCompare(b.id)),
    programmedSavings: programmedSavings.sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
    savingsContributions: savingsContributions.sort((a, b) =>
      a.id.localeCompare(b.id),
    ),
    cdats: cdats.sort((a, b) => a.id.localeCompare(b.id)),
  };
};

export {
  mapSavingProductMovementsApiToEntities,
  mapSavingProductMovementsApiToEntity,
  mapSavingsApiToEntities,
  mapSavingsApiToEntity,
};
