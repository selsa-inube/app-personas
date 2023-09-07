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

  useEffect(() => {
    if (selectedProduct) {
      const beneficiariesAttribute = selectedProduct.investment.attributes.find(
        (attr) => attr.id === "beneficiaries"
      );

      if (
        beneficiariesAttribute &&
        Array.isArray(beneficiariesAttribute.value)
      ) {
        setModals({
          ...modals,
          dataBeneficiaries: beneficiariesAttribute.value,
        });
      }

      if (selectedProduct.investment.type === "AP") {
        const refundAttribute = selectedProduct.investment.attributes.find(
          (attr) => attr.id === "refund_value"
        );

        if (refundAttribute && Array.isArray(refundAttribute.value)) {
          setModals({
            ...modals,
            dataRefund: refundAttribute.value,
          });
        }
      }
    }
  }, [selectedProduct]);

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [product_id, isMobile]);

  const handleSortProduct = () => {
    const userInvestments = investmentsMock.filter(
      (investment) => investment.userOwner === USER_ID
    );

    const investmentsOptions = userInvestments.map((investment) => {
      const productOption = {
        id: investment.id,
        value: `${investment.title} - ${investment.id}`,
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
