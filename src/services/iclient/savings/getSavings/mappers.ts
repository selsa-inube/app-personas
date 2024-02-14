import { ISavingsState } from "src/context/savings/types";
import { EProductType, IMovement, IProduct } from "src/model/entity/product";
import { capitalizeFirstLetters, capitalizeText } from "src/utils/texts";
import { getProductAttributes, getProductDetails } from "./utils";

const mapSavingProductMovementsApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: new Date(String(movement.movementDate)),
    reference: String(movement.movementNumber),
    description: capitalizeFirstLetters(String(movement.movementDescription)),
    totalValue: Number(
      movement.creditMovementPesos || movement.debitMovementPesos,
    ),
  };
  return buildMovement;
};

const mapSavingProductMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements
    .map(mapSavingProductMovementsApiToEntity)
    .filter((movement) => movement.totalValue > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

const mapSavingsApiToEntity = (
  savings: Record<string, string | number | object>,
): IProduct => {
  const productType: EProductType = Object(savings.productType).code;

  const movements = Array.isArray(savings.lastMovementTheSavingProducts)
    ? mapSavingProductMovementsApiToEntities(
        savings.lastMovementTheSavingProducts,
      )
    : [];

  const attributes = getProductAttributes(productType, savings);

  const { title, description } = getProductDetails(
    productType,
    capitalizeText(String(savings.productDescription).toLowerCase()),
    String(savings.productNumber),
  );

  return {
    id: String(savings.productNumber),
    title,
    description,
    type: productType,
    attributes,
    movements: movements,
    amortization: [],
    tags: [],
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
    .map((savings) => mapSavingsApiToEntity(savings))
    .map((savings) => {
      switch (savings.type) {
        case EProductType.VIEWSAVINGS:
          savingsAccounts.push(savings);
          break;
        case EProductType.PROGRAMMEDSAVINGS:
          programmedSavings.push(savings);
          break;
        case EProductType.PERMANENTSAVINGS: {
          if (savings.id.startsWith("201")) {
            savingsContributions.push(savings);
          }
          break;
        }
        case EProductType.CONTRIBUTIONS:
          savingsContributions.push(savings);
          break;
        case EProductType.CDAT:
          cdats.push(savings);
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
