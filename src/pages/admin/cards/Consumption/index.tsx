import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";

import { IOption } from "@inubekit/inubekit";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { ConsumptionUI } from "./interface";
import { ISelectedProductState } from "./types";
import { validateConsumption, validateConsumptionMovements } from "./utils";

function Consumption() {
  const { card_id, credit_quota_id, consumption_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [loading, setLoading] = useState(true);
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
  const { creditQuotaDetail, setCreditQuotaDetail } = useContext(CardsContext);
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);

  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [consumption_id, user, accessToken, isMobile]);

  const handleSortProduct = async () => {
    if (!consumption_id || !user || !accessToken || !card_id) return;

    const { selectedConsumption, newCreditQuotaDetail } =
      await validateConsumption(
        card_id,
        consumption_id,
        accessToken,
        creditQuotaDetail,
      );

    setCreditQuotaDetail(newCreditQuotaDetail);

    if (!selectedConsumption) return;

    setSelectedProduct({
      consumption: selectedConsumption || [],
      option: selectedConsumption.id,
    });

    if (newCreditQuotaDetail && newCreditQuotaDetail.consumptions)
      setProductsOptions(
        newCreditQuotaDetail.consumptions.map((consumption) => ({
          id: consumption.id,
          value: consumption.id,
          label: consumption.title,
        })),
      );

    validateConsumptionMovements(selectedConsumption, accessToken).then(
      ({ newSelectedConsumption }) => {
        setLoading(false);
        setSelectedProduct({
          option: newSelectedConsumption.id,
          consumption: newSelectedConsumption,
        });
      },
    );
  };

  const handleChangeProduct = (name: string, value: string) => {
    navigate(
      `/my-cards/${card_id}/credit-quota/${credit_quota_id}/consumption/${value}`,
    );
  };

  if (!getFlag("admin.cards.cards.my-cards").value) {
    return <Navigate to="/" />;
  }

  return (
    <ConsumptionUI
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      loading={loading}
      isMobile={isMobile}
      cardId={card_id}
      creditQuotaId={credit_quota_id}
      consumptionId={consumption_id}
      handleChangeProduct={handleChangeProduct}
    />
  );
}

export { Consumption };
