import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ConsumptionUI } from "./interface";
import { ISelectedProductState } from "./types";
import { validateConsumption, validateConsumptionMovements } from "./utils";
import { CardsContext } from "src/context/cards";

function Consumption() {
  const { card_id, credit_quota_id, consumption_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [loading, setLoading] = useState(true);
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const { creditQuotaDetail, setCreditQuotaDetail } = useContext(CardsContext);
  const { user, accessToken } = useAuth();

  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [consumption_id, user, accessToken, isMobile]);

  const handleSortProduct = async () => {
    if (!consumption_id || !user || !accessToken || !card_id) return;

    const { selectedConsumption, newConsumptions } = await validateConsumption(
      card_id,
      accessToken,
      consumption_id,
      creditQuotaDetail,
    );

    setCreditQuotaDetail(newConsumptions);

    if (!selectedConsumption) return;

    setSelectedProduct({
      consumption: selectedConsumption || [],
      option: selectedConsumption.id,
    });

    if (newConsumptions && newConsumptions.consumptions)
      setProductsOptions(
        newConsumptions.consumptions.map((consumption) => ({
          id: consumption.id,
          value: consumption.title,
        })),
      );

    validateConsumptionMovements(selectedConsumption, newConsumptions).then(
      ({ newConsumptions, newSelectedConsumption }) => {
        setLoading(false);
        setCreditQuotaDetail(newConsumptions);
        setSelectedProduct({
          option: newSelectedConsumption.id,
          consumption: newSelectedConsumption,
        });
      },
    );
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: consumption_id } = event.target;
    navigate(
      `/my-cards/${card_id}/credit-quota/${credit_quota_id}/consumption/${consumption_id}`,
    );
  };

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
