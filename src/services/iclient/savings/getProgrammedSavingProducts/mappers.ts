import { IProgrammedSavingProduct } from "@pages/request/savings/ProgrammedSavingRequest/forms/DestinationForm/types";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): IProgrammedSavingProduct => {
  return {
    id: String(product.savingCode),
    title: String(product.alias || product.savingName),
    maxRate: Number(Number(product.maximumRate || 0).toFixed(2)),
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
