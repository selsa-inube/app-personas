import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { CardUI } from "./interface";
import { cardsMock } from "@mocks/products/cards/cards.mock";
import { useNavigate, useParams } from "react-router-dom";
import { ISelectedProductState, initialSelectedProductState } from "./types";
import { ISelectOption } from "@design/input/Select/types";

function Card() {
  const { card_id } = useParams();
  const { cards, setCards } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ISelectedProductState>(
    initialSelectedProductState,
  );
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (user && accessToken && cards.length === 0) {
      setCards(cardsMock);
    }
  }, [user, accessToken, cards, setCards]);

  useEffect(() => {
    if (cards.length > 0) {
      const selectedCard = cards.find((card) => card.id === card_id);
      if (selectedCard) {
        setSelectedProduct({
          card: selectedCard,
          option: selectedCard.id,
        });
      }
    }
    setProductsOptions(
      cardsMock
        .map((card) => ({ id: card.id, value: card.description }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    );
  }, [cards, card_id]);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-cards/${id}`);
  };

  return (
    <CardUI
      cardId={card_id}
      selectedProduct={selectedProduct}
      productsOptions={productsOptions}
      handleChangeProduct={handleChangeProduct}
    />
  );
}

export { Card };
