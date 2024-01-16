import { ISelectOption } from "@design/input/Select/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreditsContext } from "src/context/credits";
import { crumbsMovements } from "./config/navigation";
import { CreditMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { addMovementsToCredit, validateCreditsAndMovements } from "./utils";

function CreditMovements() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { credits, setCredits } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();

  const handleSortProduct = async () => {
    if (!credit_id || !user || !accessToken) return;

    const { newCredits, selectedCredit } = await validateCreditsAndMovements(
      credits,
      credit_id,
      user?.identification,
      accessToken,
    );

    setCredits(newCredits);

    if (!selectedCredit) return;

    setSelectedProduct({
      totalMovements: selectedCredit.movements?.length || 0,
      movements: selectedCredit.movements || [],
      option: selectedCredit.id,
    });

    setProductsOptions(
      newCredits.map((credit) => ({
        id: credit.id,
        value: credit.description,
      })),
    );
  };

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, user, accessToken]);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-credits/${id}/credit-movements`);
  };

  const handleAddMovements = () => {
    if (!selectedProduct || !credit_id) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const newMovements = addMovementsToCredit(
          selectedProduct,
          credits,
          credit_id,
        );

        if (newMovements) {
          setSelectedProduct({
            ...selectedProduct,
            movements: [...selectedProduct.movements, ...newMovements],
          });
        }
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <CreditMovementsUI
      crumbsMovements={crumbsMovements(credit_id)}
      handleAddMovements={handleAddMovements}
      handleChangeProduct={handleChangeProduct}
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      credit_id={credit_id}
    />
  );
}

export { CreditMovements };
