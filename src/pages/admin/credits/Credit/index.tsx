import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { useAuth } from "@inube/auth";

import { useNavigate, useParams } from "react-router-dom";
import { CreditUI } from "./interface";
import { ISelectedProductState } from "./types";
import { validateCredits } from "./utils";

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const { credits, setCredits } = useContext(CreditsContext);
  const { user } = useAuth();

  const navigate = useNavigate();
  
  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, isMobile]);
  
 
  const handleSortProduct = async() => {

    if (!credit_id || !user) return;

    const{ selectedCredit, newCredits } = await validateCredits(
      credits,
      credit_id,
      user.identification
    );

     setCredits(newCredits);
   
    if (!selectedCredit) return;

    setSelectedProduct({
      credit: selectedCredit || [],
      option: selectedCredit.id,
    });

    setProductsOptions(
      newCredits.map((credit) => ({
        id: credit.id,
        value: credit.description,
      }))
    );
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
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
