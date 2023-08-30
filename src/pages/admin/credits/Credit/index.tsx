import { IAction } from "@design/data/Table/types";
import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mapMovement } from "../CreditMovements/config/table";
import { AmountValue } from "../MyCredits/AmountValue";
import { ViewMovement } from "../MyCredits/ViewMovement";
import { CreditUI } from "./interface";
import { ISelectedProductState } from "./types";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => <AmountValue value={movement.totalValue} />,
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (movement) => <ViewMovement movement={mapMovement(movement)} />,
    mobilePriority: true,
  },
];

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, isMobile]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: `${credit.title} - ${credit.id}`,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          credit: {
            ...credit,
            movements: credit.movements?.slice(0, isMobile ? 5 : 10),
          },
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-credits/${option.id}`);
  };

  if (!selectedProduct) return null;

  return (
    <CreditUI
      creditTableActions={creditTableActions}
      handleChangeProduct={handleChangeProduct}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      credit_id={credit_id}
    />
  );
}

export { Credit };
