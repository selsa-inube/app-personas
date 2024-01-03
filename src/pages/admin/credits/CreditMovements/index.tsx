import { ISelectOption } from "@design/input/Select/types";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovementsForCredit } from "src/services/iclient/credits";
import { crumbsMovements } from "./config/navigation";
import { CreditMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";

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

  const handleSortProduct = async () => {
    if (!credit_id) return;

    await getMovementsForCredit(credit_id, 1);
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: credit.description,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          totalMovements: credit.movements?.length || 0,
          movements: credit.movements?.slice(0, 14) || [],
          option: productOption.id,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-credits/${id}/credit-movements`);
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
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      credit_id={credit_id}
    />
  );
}

export { CreditMovements };
