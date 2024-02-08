import {
  cdatCode,
  permanentSavingsCode,
  programmedSavingCode,
  savingAccountCode,
  socialContributionsCode,
} from "@pages/admin/savings/MySavings/config/products";
import { IMovement, IProduct, ProductType } from "src/model/entity/product";
import { capitalizeFirstLetters } from "src/utils/texts";

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

const getProductDetails = (
  productTypeCode: ProductType,
  productNumber: string,
) => {
  const details = {
    PERMANENTSAVINGS: {
      title: "Ahorros permanentes",
      description: `Ahorros permanentes ${productNumber}`,
      productTypeValue: permanentSavingsCode,
    },
    CONTRIBUTIONS: {
      title: "Aportes sociales",
      description: `Aportes sociales ${productNumber}`,
      productTypeValue: socialContributionsCode,
    },
    PROGRAMMEDSAVINGS: {
      title: "",
      description: "",
      productTypeValue: programmedSavingCode,
    },
    CA: {
      title: "",
      description: "",
      productTypeValue: savingAccountCode,
    },
    CD: {
      title: "",
      description: "",
      productTypeValue: cdatCode,
    },
  };
  return details[productTypeCode] || {};
};

const mapSavingsApiToEntity = (
  savings: Record<string, string | number | object>,
): IProduct => {
  const productType = Object(savings.productType).code;

  const beneficiaries = Array.isArray(savings.savingBeneficiaries)
    ? savings.savingBeneficiaries.map((beneficiary) => ({
        id: beneficiary.beneficiaryId,
        label: beneficiary.beneficiaryName,
        value: beneficiary.benefitPercentage + " %",
      }))
    : [];

  const movements = Array.isArray(savings.lastMovementTheSavingProducts)
    ? mapSavingProductMovementsApiToEntities(
        savings.lastMovementTheSavingProducts,
      )
    : [];

  const accumulatedSavingProducts = Array.isArray(
    savings.accumulatedSavingProducts,
  )
    ? savings.accumulatedSavingProducts
    : [];

  const creditMovementPesos =
    accumulatedSavingProducts.length > 0
      ? Object(accumulatedSavingProducts[0]).creditMovementPesos
      : 0;

  const attributes = [
    {
      id: "net_value",
      label: "Saldo total",
      value: Number(creditMovementPesos),
    },
    {
      id: "beneficiaries",
      label: "Beneficiarios",
      value: beneficiaries,
    },
  ];

  const { title, description, productTypeValue } = getProductDetails(
    productType,
    String(savings.productNumber),
  );

  return {
    id: String(savings.productNumber),
    title,
    description,
    type: productTypeValue as ProductType,
    attributes: attributes,
    movements: movements,
    amortization: [],
    tags: [],
  };
};

const mapSavingsApiToEntities = (
  savings: Record<string, string | number | object>[],
): IProduct[] => {
  return savings
    .map((savings) => mapSavingsApiToEntity(savings))
    .filter(
      (savings) =>
        savings.type === "PERMANENTSAVINGS" || savings.type === "CONTRIBUTIONS",
    )
    .sort((a, b) => a.id.localeCompare(b.id));
};

export {
  mapSavingProductMovementsApiToEntities,
  mapSavingProductMovementsApiToEntity,
  mapSavingsApiToEntities,
  mapSavingsApiToEntity,
};
