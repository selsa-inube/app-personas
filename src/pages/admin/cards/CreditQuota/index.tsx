import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditQuotaUI } from "./interface";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";
import {
  getUsedQuotaData,
  validateCreditQuotaDetails,
  validateCreditQuotas,
} from "./utils";
import { consumptionsMocks } from "@mocks/products/cards/consumptions.mocks";
import { IProduct } from "src/model/entity/product";
import { useAuth } from "@inube/auth";
import { CardsContext } from "src/context/cards";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const {
    consumptions,
    setConsumptions,
    creditQuotas,
    creditQuotaDetails,
    setCreditQuotaDetails,
  } = useContext(CardsContext);
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

  useEffect(() => {
    handleSortConsumptions();
  }, [selectedProduct]);

  const handleSortProduct = async () => {
    if (!card_id || !credit_quota_id || !user || !accessToken) return;

    const { selectCreditQuotaDetails } = await validateCreditQuotaDetails(
      creditQuotaDetails,
      card_id,
      credit_quota_id,
      accessToken,
    );

    setCreditQuotaDetails(creditQuotaDetails);

    const { newCreditQuotas } = await validateCreditQuotas(
      creditQuotas,
      card_id,
      accessToken,
    );

    if (!selectCreditQuotaDetails) return;

    setSelectedProduct({
      creditQuotaDetails: selectCreditQuotaDetails,
      option: selectCreditQuotaDetails.id,
    });

    setProductsOptions(
      newCreditQuotas.map((creditQuota) => ({
        id: creditQuota.id,
        value: creditQuota.title,
      })),
    );
  };

  const usedQuotaData = () => {
    if (selectedProduct && selectedProduct.creditQuotaDetails) {
      const {
        currentConsumption,
        accumulatedDebt,
        transactionsProcess,
        usedQuotaValue,
      } = getUsedQuotaData(selectedProduct.creditQuotaDetails);

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

  const handleSortConsumptions = () => {
    const verificationDataConsumption =
      selectedProduct?.creditQuotaDetails.consumptions;
    const currentConsumption: IProduct[] = [];
    consumptionsMocks.map((consumption) => {
      if (verificationDataConsumption?.includes(consumption.id)) {
        currentConsumption.push(consumption);
      }
    });
    setConsumptions(currentConsumption);
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
        selectedConsumption={consumptions}
      />
    </>
  );
}

export { CreditQuota };
