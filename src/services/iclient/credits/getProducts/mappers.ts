import { IDestinationProduct } from "@pages/request/credits/CreditDestinationRequest/forms/DestinationForm/types";
import { capitalizeText } from "src/utils/texts";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): IDestinationProduct => {
  return {
    id: String(product.productId),
    title: product.name
      ? capitalizeText(String(product.name).toLowerCase())
      : "",
    description: product.description
      ? capitalizeText(String(product.description).toLowerCase())
      : "",
    maxRate: product.maxRate
      ? Number(Number(product.maxRate).toFixed(2))
      : undefined,
    maxDeadline: product.maxDeadline ? Number(product.maxDeadline) : undefined,
    maxAmount: Number(product.maxAmount || 0),
  };
};

const mapProductsApiToEntities = (
  products: Record<string, string | number | object>[],
): IDestinationProduct[] => {
  return products.map((product) => mapProductApiToEntity(product));
};

export { mapProductApiToEntity, mapProductsApiToEntities };
