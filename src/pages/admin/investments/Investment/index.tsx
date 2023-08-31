import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvestmentUI } from "./interface";
import { ISelectedProductState } from "./types";
function Investment() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [product_id, isMobile]);

  const userId = "1";

  const handleSortProduct = () => {
    const userInvestments = investmentsMock.filter(
      (investment) => investment.userOwner === userId
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
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      product_id={product_id}
    />
  );
}

export { Investment };
