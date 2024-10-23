import { IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { ICreditDestinationProduct } from "../types";

const formatDestinationAttributes = (
  product: ICreditDestinationProduct,
): IAttribute[] => {
  return [
    {
      id: "maxRate",
      label: "Tasa máxima",
      value: `${product.maxRate}%`,
    },
    {
      id: "maxDeadline",
      label: "Plazo máximo",
      value: `${product.maxDeadline} meses`,
    },
    {
      id: "minAmount",
      label: "Monto mínimo",
      value: currencyFormat(product.minAmount),
    },
    {
      id: "maxAmount",
      label: "Monto máximo",
      value: currencyFormat(product.maxAmount),
    },
  ];
};

export { formatDestinationAttributes };
