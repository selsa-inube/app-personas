import { currencyFormat } from "@utils/currency";
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
      value: `${currencyFormat(product.minQuota)}`,
    },
  ];
};

export { formatDestinationAttributes };
