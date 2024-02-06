import { IProduct, ProductType } from "src/model/entity/product";
import {
  permanentSavingsCode,
  socialContributionsCode,
} from "@pages/admin/savings/MySavings/config/products";
import { capitalizeFirstLetters } from "src/utils/texts";

const mapSavingsApiToEntity = (
  savings: Record<string, string | number | object>,
): IProduct => {
  const beneficiaries = Array.isArray(savings.savingBeneficiaries)
    ? savings.savingBeneficiaries.map((beneficiary) => ({
        id: beneficiary.beneficiaryId,
        label: beneficiary.beneficiaryName,
        value: beneficiary.benefitPercentage + " %",
      }))
    : [];

  const movements = Array.isArray(savings.lastMovementTheSavingProducts)
    ? savings.lastMovementTheSavingProducts
        .map((movement) => ({
          id: movement.movementId,
          date: new Date(String(movement.movementDate)),
          reference: movement.movementNumber,
          description: capitalizeFirstLetters(movement.movementDescription),
          totalValue:
            movement.creditMovementPesos || movement.debitMovementPesos,
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
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

  const permanentSavings =
    typeof savings.productType === "object" &&
    "code" in savings.productType &&
    savings.productType.code === "PERMANENTSAVINGS";

  const contributions =
    typeof savings.productType === "object" &&
    "code" in savings.productType &&
    savings.productType.code === "CONTRIBUTIONS";

  let productType: ProductType = String() as ProductType;
  let title = "";
  let description = "";

  if (contributions) {
    title = "Aportes sociales";
    description = `Aportes sociales ${savings.productNumber}`;
    productType = socialContributionsCode as ProductType;
  }

  if (savings.productCatalogCode === "1" && permanentSavings) {
    title = "Ahorros permanentes";
    description = `Ahorros permanentes ${savings.productNumber}`;
    productType = permanentSavingsCode as ProductType;
  }

  return {
    id: String(savings.productNumber),
    title,
    description,
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
