import { ISelectOption } from "@design/input/Select/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { validateSaving } from "../SavingsAccount/utils";
import { SavingsAccountMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { addMovementsToSaving } from "./utils";

function SavingsAccountMovements() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { savings, setSavings } = useContext(SavingsContext);

  const handleSortProduct = async () => {
    if (!product_id || !user || !accessToken) return;

    const { selectedSaving, newSavings, combinedSavings } =
      await validateSaving(
        savings,
        product_id,
        user.identification,
        accessToken,
      );

    setSavings(newSavings);

    if (!selectedSaving) return;

    setSelectedProduct({
      totalMovements: selectedSaving.movements?.length || 0,
      movements: selectedSaving.movements?.slice(0, 7) || [],
      option: selectedSaving.id,
    });

    setProductsOptions(
      combinedSavings.map((saving) => ({
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
