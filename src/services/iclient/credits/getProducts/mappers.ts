import { ICreditDestinationProduct } from "@pages/request/credits/CreditDestinationRequest/forms/DestinationForm/types";
import { capitalizeText } from "src/utils/texts";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): ICreditDestinationProduct => {
  return {
    id: String(product.productId),
    title: String(product.name),
    description: product.description
      ? capitalizeText(String(product.description).toLowerCase())
      : "",
    maxRate: product.maxRate
      ? Number(Number(product.maxRate).toFixed(2))
      : undefined,
    maxDeadline: product.maxDeadline ? Number(product.maxDeadline) : undefined,
    maxAmount: Number(product.maxAmount || 0),
    minAmount: Number(product.minAmount || 0),
    maxAmountForUser: Number(product.maxAmountByUser || 0),
    amortizationType: "IntegralFixedQuota",
    publishStatus:
      typeof product.publishStatus === "boolean"
        ? product.publishStatus
        : undefined,
  };
};

const mapProductsApiToEntities = (
  products: Record<string, string | number | object>[],
): ICreditDestinationProduct[] => {
  return products.map((product) => mapProductApiToEntity(product));
};

export { mapProductApiToEntity, mapProductsApiToEntities };
