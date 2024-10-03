import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { SavingsContext } from "src/context/savings";
import { getCardsForUser } from "src/services/iclient/cards/getCards";
import { MyCardsUI } from "./interface";

function MyCards() {
  const { cards, setCards } = useContext(CardsContext);
  const { savings } = useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      getCardsForUser(user.identification, accessToken, savings.savingsAccounts)
        .then((credits) => {
          setCards(credits);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, accessToken]);

  const withRequestCard = getFlag("admin.cards.cards.request-card").value;

  return (
    <MyCardsUI
      cards={cards}
      loading={loading}
      withRequestCard={withRequestCard}
    />
  );
}

export { MyCards };
