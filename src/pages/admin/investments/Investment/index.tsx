import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USER_ID } from "src/App";
import { InvestmentUI } from "./interface";
import { IModalState, ISelectedProductState } from "./types";

function Investment() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [modals, setModals] = useState<IModalState>({
    showBeneficiaries: false,
    showRefund: false,
    dataBeneficiaries: [],
    dataRefund: [],
  });

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    updateModals("beneficiaries", "dataBeneficiaries");

    if (selectedProduct && selectedProduct.investment.type === "AP") {
      updateModals("refund_value", "dataRefund");
    }
  }, [selectedProduct]);

  useEffect(() => {
    handleSortProduct();
  }, [product_id, isMobile]);

  const updateModals = (attrId: string, modalKey: string) => {
    if (!selectedProduct) return;

    const attribute = selectedProduct.investment.attributes.find(
      (attr) => attr.id === attrId
    );

    if (attribute && Array.isArray(attribute.value)) {
      setModals((prevModals) => ({
        ...prevModals,
        [modalKey]: attribute.value,
      }));
    }
  };

  const handleSortProduct = () => {
    const userInvestments = investmentsMock.filter(
      (investment) => investment.userOwner === USER_ID
    );

    const investmentsOptions = userInvestments.map((investment) => {
      const productOption = {
        id: investment.id,
        value: investment.description,
      };

      if (investment.id === product_id) {
        setSelectedProduct({
          investment: {
            ...investment,
            attributes: investment.attributes,
          },
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(investmentsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-investments/${option.id}`);
  };

  const handleToggleBeneficiariesModal = () => {
    setModals((prevState) => ({
      ...prevState,
      showBeneficiaries: !prevState.showBeneficiaries,
    }));
  };
  const handleToggleRefundModal = () => {
    setModals((prevState) => ({
      ...prevState,
      showRefund: !prevState.showRefund,
    }));
  };

  if (!selectedProduct) return null;

  return (
    <InvestmentUI
      handleChangeProduct={handleChangeProduct}
      handleToggleBeneficiariesModal={handleToggleBeneficiariesModal}
      handleToggleRefundModal={handleToggleRefundModal}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      productId={product_id}
      modals={modals}
    />
  );
}

export { Investment };
