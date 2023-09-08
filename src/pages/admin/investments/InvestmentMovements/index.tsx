import { ISelectOption } from "@design/input/Select/types";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvestmentMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";

function InvestmentMovements() {
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
    const investmentsOptions = investmentsMock.map((investment) => {
      const productOption = {
        id: investment.id,
        value: investment.description,
      };

      if (investment.id === product_id) {
        setSelectedProduct({
          totalMovements: investment.movements?.length || 0,
          movements: investment.movements?.slice(0, 14) || [],
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(investmentsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    const goToInvestment = investmentsMock.find(
      (investment) => investment.id === option.id
    );
    if (!goToInvestment?.movements) return;
    navigate(`/my-investments/${option.id}/movements`);
  };

  const handleAddMovements = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedProduct?.movements) return;

        const foundProduct = investmentsMock.find(
          (investment) => investment.id === product_id
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
    <InvestmentMovementsUI
      handleAddMovements={handleAddMovements}
      handleChangeProduct={handleChangeProduct}
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      productId={product_id}
    />
  );
}

export { InvestmentMovements };
