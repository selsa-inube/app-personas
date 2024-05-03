import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";

import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardsContext } from "src/context/cards";
import { CreditQuotaUI } from "./interface";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";
import {
  getUsedQuotaData,
  validateCreditQuotaDetail,
  validateCreditQuotas,
} from "./utils";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const { cards, creditQuotas, creditQuotaDetail, setCreditQuotaDetail } =
    useContext(CardsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>();
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false,
  });
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, user, accessToken, isMobile]);

  useEffect(() => {
    usedQuotaData();
  }, [selectedProduct]);

  const handleSortProduct = async () => {
    if (!card_id || !credit_quota_id || !user || !accessToken) return;

    if (cards.length === 0) return;

    const { newCreditQuotas } = await validateCreditQuotas(
      creditQuotas,
      card_id,
      accessToken,
    );

    const isCardQuotaValid = newCreditQuotas.every((creditQuota) =>
      cards.some(
        (card) =>
          card.quotaDetails &&
          card.quotaDetails.some(
            (quotaDetail) => quotaDetail === creditQuota.id,
          ),
      ),
    );

    if (!isCardQuotaValid) return;

    const { selectedCreditQuotaDetail } = await validateCreditQuotaDetail(
      card_id,
      credit_quota_id,
      accessToken,
      creditQuotaDetail,
    );

    setCreditQuotaDetail(creditQuotaDetail);

    if (!selectedCreditQuotaDetail) return;

    setSelectedProduct({
      creditQuotaDetail: selectedCreditQuotaDetail,
      option: selectedCreditQuotaDetail.id,
    });

    setProductsOptions(
      newCreditQuotas.map((creditQuota) => ({
        id: creditQuota.id,
        value: creditQuota.title,
      })),
    );
  };

  const usedQuotaData = () => {
    if (selectedProduct && selectedProduct.creditQuotaDetail) {
      const {
        currentConsumption,
        accumulatedDebt,
        transactionsProcess,
        usedQuotaValue,
      } = getUsedQuotaData(selectedProduct.creditQuotaDetail);

      if (!usedQuotaValue) return;
      setUsedQuotaModal({
        ...usedQuotaModal,
        data: {
          currentConsumption,
          accumulatedDebt,
          transactionsProcess,
          usedQuotaValue,
        },
      });
    }
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-cards/${card_id}/credit-quota/${id}`);
  };

  if (!selectedProduct) return null;

  const handleUsedQuotaModal = () => {
    setUsedQuotaModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  return (
    <>
      <CreditQuotaUI
        cardId={card_id}
        creditQuotaId={credit_quota_id}
        usedQuotaModal={usedQuotaModal}
        handleToggleUsedQuotaModal={handleUsedQuotaModal}
        handleChangeProduct={handleChangeProduct}
        productsOptions={productsOptions}
        selectedProduct={selectedProduct}
        selectedConsumption={selectedProduct.creditQuotaDetail?.consumptions}
      />
    </>
  );
}

export { CreditQuota };
