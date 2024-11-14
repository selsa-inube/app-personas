import { ICdatProduct } from "@pages/request/savings/CdatRequest/types";

const mapProductApiToEntity = (
  product: Record<string, string | number | object>,
): ICdatProduct => {
  return {
    id: String(product.cdatCode),
    title: String(product.alias || product.cdatName),
    minInvestment: Number(product.minimumInvestmentValue || 0),
    maxInvestment: Number(product.maximumInvestmentValue || 0),
  };
};

const mapProductsApiToEntities = (
  products: Record<string, string | number | object>[],
): ICdatProduct[] => {
  return products
    .filter((product) => Boolean(product.publish) === true)
    .map((product) => mapProductApiToEntity(product));
};

export { mapProductApiToEntity, mapProductsApiToEntities };
