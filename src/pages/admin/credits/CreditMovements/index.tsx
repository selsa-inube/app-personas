import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "src/context/app";
import { CreditsContext } from "src/context/credits";
import { IMovement } from "src/model/entity/product";
import { crumbsMovements } from "./config/navigation";
import { CreditMovementsUI } from "./interface";
import { ISelectedProductState } from "./types";
import { addMovementsToCredit, validateCreditsAndMovements } from "./utils";

function CreditMovements() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
  const [creditMovementModal, setCreditMovementModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<IMovement>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { credits, setCredits } = useContext(CreditsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const handleSortProduct = async () => {
    if (!credit_id || !user || !accessToken) return;

    const { newCredits, selectedCredit } = await validateCreditsAndMovements(
      credits,
      credit_id,
      user.identification,
      accessToken,
    );

    setCredits(newCredits);

    if (!selectedCredit) return;

    setSelectedProduct({
      totalMovements: selectedCredit.movements?.length || 0,
      movements: selectedCredit.movements?.slice(0, 7) || [],
      option: selectedCredit.id,
    });

    setProductsOptions(
      newCredits.map((credit) => ({
        id: credit.id,
        value: credit.id,
        label: credit.description,
      })),
    );
  };

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, user, accessToken]);

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-credits/${value}/credit-movements`);
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

  const handleOpenModal = (movement: IMovement) => {
    setSelectedMovement(movement);
    setCreditMovementModal(true);
  };

  const handleCloseModal = () => {
    setCreditMovementModal(false);
    setSelectedMovement(undefined);
  };

  return (
    <CreditMovementsUI
      loading={loading}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      credit_id={credit_id}
      creditMovementModal={creditMovementModal}
      selectedMovement={selectedMovement}
      crumbsMovements={crumbsMovements(credit_id)}
      handleAddMovements={handleAddMovements}
      handleChangeProduct={handleChangeProduct}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
    />
  );
}

export { CreditMovements };
