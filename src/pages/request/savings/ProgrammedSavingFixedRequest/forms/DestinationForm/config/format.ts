import { IAttribute } from "src/model/entity/product";
import { IProgrammedSavingProduct } from "../types";

const formatDestinationAttributes = (
  product: IProgrammedSavingProduct,
): IAttribute[] => {
  return [
    {
      id: "maxRate",
      label: "Tasa máxima",
      value: `${product.maxRate}%`,
    },
    {
      id: "minQuota",
      label: "Cuota mínima",
      value: `$${product.minQuota}`,
    },
  ];
};

export { formatDestinationAttributes };
