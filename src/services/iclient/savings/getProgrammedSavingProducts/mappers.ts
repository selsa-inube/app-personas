import { IProgrammedSavingProduct } from "@pages/request/savings/ProgrammedSavingFixedRequest/forms/DestinationForm/types";
import { capitalizeText } from "src/utils/texts";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): IProgrammedSavingProduct => {
  return {
    id: String(product.savingCode),
    title: capitalizeText(String(product.savingName)),
    maxRate: Number(Number(product.maxRate || 0).toFixed(2)),
    minDeadline: Number(product.minimumQuotaTerm),
    maxDeadline: Number(product.maximumQuotaTerm),
    maxQuota: Number(product.maximumQuotaValue || 0),
    minQuota: Number(product.minimumQuotaValue || 0),
  };
};

const mapProductsApiToEntities = (
  products: Record<string, string | number | object>[],
): IProgrammedSavingProduct[] => {
  return products
    .filter((product) => Boolean(product.publish) === true)
    .map((product) => mapProductApiToEntity(product));
};

export { mapProductApiToEntity, mapProductsApiToEntities };
