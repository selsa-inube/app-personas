import { IAction } from "@design/data/Table/types";
import { ISelectOption } from "@design/input/Select/types";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ViewMovement } from "../MyCredits/ViewMovement";
import { crumbsMovements } from "./config/navigation";
import { mapMovement } from "./config/table";
import { CreditMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { Text } from "@design/data/Text";
import { currencyFormat } from "src/utils/formats";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => (
      <Text type="body" size="small" appearance="dark">
        {currencyFormat(movement.totalValue)}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (movement) => <ViewMovement movement={mapMovement(movement)} />,
    mobilePriority: true,
  },
];

function CreditMovements() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSortProduct();
  }, [credit_id]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: `${credit.title} - ${credit.id}`,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          totalMovements: credit.movements?.length || 0,
          movements: credit.movements?.slice(0, 14) || [],
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-credits/${option.id}/credit-movements`);
  };

  const handleAddMovements = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedProduct?.movements) return;

        const foundProduct = creditsMock.find(
          (credit) => credit.id === credit_id
        );

        if (!foundProduct) return;

        const newMovements = foundProduct.movements?.slice(
          selectedProduct.movements.length,
          selectedProduct.movements.length + 5
        );

        if (newMovements) {
          setSelectedProduct({
            ...selectedProduct,
            movements: [...selectedProduct.movements, ...newMovements],
          });
        }
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  if (!selectedProduct) return null;

  return (
    <CreditMovementsUI
      crumbsMovements={crumbsMovements(credit_id)}
      handleAddMovements={handleAddMovements}
      handleChangeProduct={handleChangeProduct}
      creditTableActions={creditTableActions}
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      credit_id={credit_id}
    />
  );
}

export { CreditMovements };
