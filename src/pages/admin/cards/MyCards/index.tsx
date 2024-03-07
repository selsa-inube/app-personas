import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { MyCardsUI } from "./interface";
import { cardsMock } from "@mocks/products/cards/cards.mock";

function MyCards() {
  const { cards, setCards } = useContext(CreditsContext);
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (user && accessToken && cards.length === 0) {
      setLoading(true);
      setTimeout(() => {
        setCards(cardsMock);
        setLoading(false);
      }, 1000);
    }
  }, [user, accessToken, cards]);

  return <MyCardsUI cards={cards} loading={loading} />;
}

export { MyCards };
