import { IProduct, ProductType } from "src/model/entity/product";

const mapCreditApiToEntity = (
  credit: Record<string, string | number | boolean>
): IProduct => {
  return {
    id: String(credit.obligationNumber),
    title: String(credit.productName),
    description: `${credit.productName} ${credit.obligationNumber}`,
    type: String(credit.lineCode) as ProductType,
    attributes: [],
    movements: [],
    amortization: [],
  };
};

const mapCreditsApiToEntities = (
  credits: Record<string, string | number | boolean>[]
): IProduct[] => {
  return credits.map((credit) => mapCreditApiToEntity(credit));
};

export { mapCreditApiToEntity, mapCreditsApiToEntities };
