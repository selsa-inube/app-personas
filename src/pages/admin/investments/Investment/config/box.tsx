import { ProductType } from "src/model/entity/product";
import { MdOutlinePaid } from "react-icons/md";

const investmentBoxButton = (type: ProductType) =>
  type === "AP"
    ? {
        label: "Compromisos de ahorro",
        icon: <MdOutlinePaid />,
        path: ``,
      }
    : undefined;

export { investmentBoxButton };
