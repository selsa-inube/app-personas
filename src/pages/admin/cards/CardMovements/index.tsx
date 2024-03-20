import { useNavigate, useParams } from "react-router-dom";
import { CardMovementsUI } from "./interface";
import { useEffect, useState } from "react";
import { ISelectOption } from "@design/input/Select/types";
import { ISelectedProductState } from "./types";
import { creditQuotasMock } from "@mocks/products/cards/creditQuotas.mock";
import { useMediaQuery } from "@hooks/useMediaQuery";

function CardMovements() {
  const { card_id, credit_quota_id } = useParams();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, isMobile]);

  const handleSortProduct = () => {
    const movements: ISelectOption[] = [];
    creditQuotasMock.forEach((movement) => {
      if (card_id) {
        movements.push({
          id: movement.id,
          value: movement.title,
        });
        if (movement.id === credit_quota_id) {
          setSelectedProduct({
            movement: {
              ...movement,
            },
            option: movement.id,
          });
        }
      }
    });
    setProductsOptions(movements);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-cards/${card_id}/movements/${id}`);
  };

  if (!selectedProduct) return null;

  return (
    <CardMovementsUI
      cardId={card_id}
      creditQuotaId={credit_quota_id}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      handleChangeProduct={handleChangeProduct}
    />
  );
}

export { CardMovements };
