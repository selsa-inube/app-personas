import { ISelectOption } from "@design/input/Select/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsAccountMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { SavingsContext } from "src/context/savings";
import { useContext } from "react";
import { validateSaving } from "../SavingsAccount/utils";
import { useAuth } from "@inube/auth";
import { addMovementsToSaving } from "./utils";
import { socialContributionsCode } from "../MySavings/config/products";

function SavingsAccountMovements() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();
  const { savings, setSavings } = useContext(SavingsContext);

  const handleSortProduct = async () => {
    if (!product_id || !user || !accessToken) return;

    const { selectedSavings, newSavings } = await validateSaving(
      savings,
      product_id,
      user.identification,
      accessToken,
    );

    setSavings(newSavings);

    if (!selectedSavings) return;

    setSelectedProduct({
      totalMovements: selectedSavings.movements?.length || 0,
      movements: selectedSavings.movements?.slice(0, 10) || [],
      option: selectedSavings.id,
    });

    setProductsOptions(
      newSavings
        .filter((saving) => saving.type === socialContributionsCode)
        .map((saving) => ({
          id: saving.id,
          value: saving.description,
        })),
    );
  };

  useEffect(() => {
    handleSortProduct();
  }, [product_id, user, accessToken]);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-savings/account/${id}/movements`);
  };

  const handleAddMovements = () => {
    if (!selectedProduct || !product_id) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const newMovements = addMovementsToSaving(
          selectedProduct,
          savings,
          product_id,
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
