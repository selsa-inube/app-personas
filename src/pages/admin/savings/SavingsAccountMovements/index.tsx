import { IAction } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { ISelectOption } from "@design/input/Select/types";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormat } from "src/utils/formats";
import { ViewSavingMovement } from "../MySavings/ViewSavingMovement";
import { mapSavingAccountMovement } from "./config/table";
import { SavingsAccountMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";

const savingsAccountTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => (
      <Text
        type="body"
        size="small"
        appearance={movement.totalValue >= 0 ? "dark" : "error"}
      >
        {currencyFormat(movement.totalValue)}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: (movement) => (
      <ViewSavingMovement movement={mapSavingAccountMovement(movement)} />
    ),
    mobilePriority: true,
  },
];

function SavingsAccountMovements() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSortProduct();
  }, [product_id]);

  const handleSortProduct = () => {
    const savingsOptions = savingsMock.map((saving) => {
      const productOption = {
        id: saving.id,
        value: `${saving.title} - ${saving.id}`,
      };

      if (saving.id === product_id) {
        setSelectedProduct({
          totalMovements: saving.movements?.length || 0,
          movements: saving.movements?.slice(0, 14) || [],
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(savingsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-savings/account/${option.id}/saving-movements`);
  };

  const handleAddMovements = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedProduct?.movements) return;

        const foundProduct = savingsMock.find(
          (saving) => saving.id === product_id
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
    <SavingsAccountMovementsUI
      handleAddMovements={handleAddMovements}
      handleChangeProduct={handleChangeProduct}
      savingsAccountTableActions={savingsAccountTableActions}
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      product_id={product_id}
    />
  );
}

export { SavingsAccountMovements };
