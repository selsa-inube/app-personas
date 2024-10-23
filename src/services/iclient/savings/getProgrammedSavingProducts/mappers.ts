import { IProgrammedSavingProduct } from "@pages/request/savings/ProgrammedSavingFixedRequest/forms/DestinationForm/types";
import { capitalizeText } from "src/utils/texts";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): IProgrammedSavingProduct => {
  return {
    id: String(product.productId),
    title: String(product.name),
    description: product.description
      ? capitalizeText(String(product.description).toLowerCase())
      : "",
    maxRate: Number(Number(product.maxRate).toFixed(2)),
    minDeadline: Number(product.minDeadline),
    maxDeadline: Number(product.maxDeadline),
    maxQuota: Number(product.maxAmount || 0),
    minQuota: Number(product.minAmount || 0),
  };
};

const mapProductsApiToEntities = (
  products: Record<string, string | number | object>[],
): IProgrammedSavingProduct[] => {
  return products.map((product) => mapProductApiToEntity(product));
};

export { mapProductApiToEntity, mapProductsApiToEntities };
