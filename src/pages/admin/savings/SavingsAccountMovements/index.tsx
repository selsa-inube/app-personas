import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
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
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
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
        value: saving.id,
        label: saving.description,
      })),
    );
  };

  useEffect(() => {
    handleSortProduct();
  }, [product_id, user, accessToken]);

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-savings/account/${value}/movements`);
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
