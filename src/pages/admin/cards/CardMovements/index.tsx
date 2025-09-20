import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { CardMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { addMovementsToCard, validateCreditQuotas } from "./utils";

function CardMovements() {
  const { card_id, credit_quota_id } = useParams();
  const { creditQuotas, setCreditQuotas } = useContext(CardsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, user, accessToken, isMobile]);

  const handleSortProduct = async () => {
    if (!card_id || !credit_quota_id || !user || !accessToken) return;

    const { selectCreditQuotas, newCreditQuotas } = await validateCreditQuotas(
      creditQuotas,
      card_id,
      credit_quota_id,
      accessToken,
    );

    setCreditQuotas(newCreditQuotas);

    if (!selectCreditQuotas) return;

    setSelectedProduct({
      movements: selectCreditQuotas.movements?.slice(0, 8) || [],
      totalMovements: selectCreditQuotas.movements?.length || 0,
      option: selectCreditQuotas.id,
    });

    setProductsOptions(
      newCreditQuotas.map((creditQuota) => ({
        id: creditQuota.id,
        value: creditQuota.id,
        label: creditQuota.title,
      })),
    );
  };

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-cards/${card_id}/movements/${value}`);
  };

  if (!selectedProduct || !selectedProduct.movements) return null;

  const handleAddMovements = () => {
    if (!selectedProduct || !credit_quota_id) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const newMovements = addMovementsToCard(
          selectedProduct,
          creditQuotas,
          credit_quota_id,
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

  if (!getFlag("admin.cards.cards.my-cards").value) {
    return <Navigate to="/" />;
  }

  return (
    <CardMovementsUI
      cardId={card_id}
      creditQuotaId={credit_quota_id}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      loading={loading}
      handleChangeProduct={handleChangeProduct}
      handleAddMovements={handleAddMovements}
    />
  );
}

export { CardMovements };
