import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { creditQuotasMock } from "@mocks/products/cards/creditQuotas.mock";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditQuotaUI } from "./interface";
import {
  ISelectedProductState,
  IUsedQuotaModalState,
} from "./types";
import { getUsedQuotaData } from "./utils";
import { consumptionsMocks } from "@mocks/products/cards/consumptions.mocks";
import { IProduct } from "src/model/entity/product";
import { CreditsContext } from "src/context/credits";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const { consumptions, setConsumptions } = useContext(CreditsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false,
  });
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, isMobile]);

  useEffect(() => {
    handleSortConsumptions();
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;

    const {
      currentConsumption,
      accumulatedDebt,
      transactionsProcess,
      usedQuotaValue,
    } = getUsedQuotaData(selectedProduct.creditQuota);

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
  }, [selectedProduct]);

  const handleSortProduct = () => {
    const creditQuotas: ISelectOption[] = [];
    creditQuotasMock.forEach((creditQuota) => {
      if (card_id) {
        creditQuotas.push({
          id: creditQuota.id,
          value: creditQuota.title,
        });
        if (creditQuota.id === credit_quota_id) {
          setSelectedProduct({
            creditQuota: {
              ...creditQuota,
            },
            option: creditQuota.id,
          });
        }
      }
    });
    setProductsOptions(creditQuotas);
  };

  const handleSortConsumptions = () => {
    const verificationDataConsumption = selectedProduct?.creditQuota.consumptions;
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
