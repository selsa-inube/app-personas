import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";

import { IOption } from "@inubekit/inubekit";
import { Navigate, useNavigate, useParams } from "react-router";
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

  const { cards } = useContext(CardsContext);
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    const card = cards.find((card) => card.id === card_id);
    const cardNumberValue = card
      ? String(card.attributes.find((attr) => attr.id === "card_number")?.value)
      : "";

    let isMounted = true;

    const loadData = async () => {
      if (!isMounted) return;

      setLoading(true);
      setSelectedProduct(undefined);
      setProductsOptions([]);

      if (!consumption_id || !user || !accessToken || !card_id) {
        setLoading(false);
        return;
      }

      try {
        const { selectedConsumption, newCreditQuotaDetail } =
          await validateConsumption(
            cardNumberValue,
            consumption_id,
            accessToken,
            undefined,
          );

        if (!isMounted) return;

        if (!selectedConsumption) {
          setLoading(false);
          return;
        }

        setSelectedProduct({
          consumption: selectedConsumption,
          option: selectedConsumption.id,
        });

        if (newCreditQuotaDetail?.consumptions) {
          setProductsOptions(
            newCreditQuotaDetail.consumptions.map((consumption) => ({
              id: consumption.id,
              value: consumption.id,
              label: consumption.title,
            })),
          );
        }

        const { newSelectedConsumption } = await validateConsumptionMovements(
          selectedConsumption,
          accessToken,
        );

        if (!isMounted) return;

        setSelectedProduct({
          option: newSelectedConsumption.id,
          consumption: newSelectedConsumption,
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [consumption_id, user, accessToken, card_id, credit_quota_id, cards]);

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
