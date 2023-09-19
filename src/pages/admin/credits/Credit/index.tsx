import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditUI } from "./interface";
import { ISelectedProductState } from "./types";

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, isMobile]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: credit.description,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          credit: {
            ...credit,
            movements: credit.movements?.slice(0, isMobile ? 5 : 10),
          },
          option: productOption.id,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (id: string) => {
    navigate(`/my-credits/${id}`);
  };

  if (!selectedProduct) return null;

  return (
    <CreditUI
      handleChangeProduct={handleChangeProduct}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      credit_id={credit_id}
    />
  );
}

export { Credit };
