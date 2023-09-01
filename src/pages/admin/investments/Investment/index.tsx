import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvestmentUI } from "./interface";
import { ISelectedProductState } from "./types";
import { USER_ID } from "src/App";
import { IAttribute } from "@ptypes/pages/product.types";
import { IBeneficiariesModal } from "./types";

function Investment() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [beneficiariesModal, setBeneficiariesModal] =
    useState<IBeneficiariesModal>({
      show: false,
      data: [],
    });

  const handleToggleModal = () => {
    setBeneficiariesModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  useEffect(() => {
    if (selectedProduct) {
      const beneficiariesAttribute = selectedProduct.investment.attributes.find(
        (attr) => attr.id === "beneficiaries"
      );
      if (beneficiariesAttribute) {
        let beneficiaries: IAttribute[] = [];
        if (Array.isArray(beneficiariesAttribute.value)) {
          beneficiaries = beneficiariesAttribute.value;
        }
        setBeneficiariesModal({
          show: false,
          data: beneficiaries,
        });
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

  if (!selectedProduct) return null;

  return (
    <InvestmentUI
      handleChangeProduct={handleChangeProduct}
      handleToggleModal={handleToggleModal}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      productId={product_id}
      beneficiariesModal={beneficiariesModal}
    />
  );
}

export type { IBeneficiariesModal };
export { Investment };
