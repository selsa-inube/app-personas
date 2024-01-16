import { ISelectOption } from "@design/input/Select/types";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsAccountMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";

function SavingsAccountMovements() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSortProduct = () => {
    const products = [
      ...savingsMock,
      ...investmentsMock.filter((item) => item.type !== "CD"),
    ];

    const savingsOptions = products.map((saving) => {
      const productOption = {
        id: saving.id,
        value: saving.description,
      };

      if (saving.id === product_id) {
        setSelectedProduct({
          totalMovements: saving.movements?.length || 0,
          movements: saving.movements?.slice(0, 14) || [],
          option: productOption.id,
        });
      }

      return productOption;
    });

    setProductsOptions(savingsOptions);
  };

  useEffect(() => {
    handleSortProduct();
  }, [product_id]);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-savings/account/${id}/movements`);
  };

  const handleAddMovements = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedProduct?.movements) return;

        const products = [
          ...savingsMock,
          ...investmentsMock.filter((item) => item.type !== "CD"),
        ];

        const foundProduct = products.find(
          (saving) => saving.id === product_id,
        );

        if (!foundProduct) return;

        const newMovements = foundProduct.movements?.slice(
          selectedProduct.movements.length,
          selectedProduct.movements.length + 5,
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
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      productId={product_id}
    />
  );
}

export { SavingsAccountMovements };
