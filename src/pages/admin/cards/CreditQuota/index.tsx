import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditQuotaUI } from "./interface";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";
import { getUsedQuotaData, validateCreditQuotas } from "./utils";
import { consumptionsMocks } from "@mocks/products/cards/consumptions.mocks";
import { IProduct } from "src/model/entity/product";
import { useAuth } from "@inube/auth";
import { CardsContext } from "src/context/cards";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const { consumptions, setConsumptions, creditQuotas, setCreditQuotas } =
    useContext(CardsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false
  });
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, user, accessToken, isMobile]);
  
  useEffect(() => {
    if (!selectedProduct) return;

    const {
      currentConsumption,
      accumulatedDebt,
      transactionsProcess,
      usedQuotaValue,
    } = getUsedQuotaData(creditQuotas);

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
  }, [card_id, credit_quota_id ,selectedProduct]);

  useEffect(() => {
    handleSortConsumptions();
  }, [selectedProduct]);

 

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
      creditQuota: selectCreditQuotas || [],
      option: selectCreditQuotas.id,
    });

    setProductsOptions(
      newCreditQuotas.map((creditQuota)=>({
        id: creditQuota.id,
        value: creditQuota.title,
      }))
    )
  };
 
  const handleSortConsumptions = () => {
    const verificationDataConsumption =
      selectedProduct?.creditQuota.consumptions;
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

  if (!selectedProduct || !selectedProduct.creditQuota) return null;

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
