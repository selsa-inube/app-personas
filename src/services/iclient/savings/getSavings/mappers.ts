import { IProduct, ProductType } from "src/model/entity/product";
import { capitalizeText } from "src/utils/texts";
import { socialContributionsCode } from "@pages/admin/savings/MySavings/config/products";
import { capitalizeFirstLetters } from "src/utils/texts";

const mapSavingsApiToEntity = (
  savings: Record<string, string | number | object>,
): IProduct => {
  const normalizedProductName = capitalizeText(
    String(savings.productDescription).toLowerCase(),
  );

  const beneficiaries = Array.isArray(savings.savingBeneficiaries)
    ? savings.savingBeneficiaries.map((beneficiary) => ({
        id: beneficiary.beneficiaryId,
        label: beneficiary.beneficiaryName,
        value: beneficiary.benefitPercentage + " %",
      }))
    : [];

  const movements = Array.isArray(savings.lastMovementTheSavingProducts)
    ? savings.lastMovementTheSavingProducts.map((movement) => ({
        id: movement.movementId,
        date: new Date(String(movement.movementDate)),
        reference: movement.movementNumber,
        description: capitalizeFirstLetters(movement.movementDescription),
        totalValue: movement.creditMovementPesos || movement.debitMovementPesos,
      }))
    : [];

  const attributes = [
    {
      id: "net_value",
      label: "Saldo total",
      value: Number(
        Object(savings.accumulatedSavingProducts)[0].creditMovementPesos,
      ),
    },
    {
      id: "beneficiaries",
      label: "Beneficiarios",
      value: beneficiaries,
    },
  ];

  let productType: ProductType = String() as ProductType;
  if (
    savings.productCatalogCode === "1" ||
    savings.productCatalogCode === "1A"
  ) {
    productType = socialContributionsCode as ProductType;
  }

  return {
    id: String(savings.productNumber),
    title: normalizedProductName,
    description: `${normalizedProductName} ${savings.productNumber}`,
    type: productType,
    attributes: attributes,
    movements: movements,
    amortization: [],
    tags: [],
  };
};

const mapSavingsApiToEntities = (
  savings: Record<string, string | number | object>[],
): IProduct[] => {
  return savings.map((savings) => mapSavingsApiToEntity(savings));
};

export { mapSavingsApiToEntity, mapSavingsApiToEntities };
