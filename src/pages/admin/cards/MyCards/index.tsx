import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { SavingsContext } from "src/context/savings";
import { getCardsForUser } from "src/services/iclient/cards/getCards";
import { MyCardsUI } from "./interface";
import { CardsContext } from "src/context/cards";

function MyCards() {
  const { cards, setCards } = useContext(CardsContext);
  const { savings } = useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (user && accessToken && cards.length === 0) {
      setLoading(true);
      getCardsForUser(
        user?.identification,
        accessToken,
        savings.savingsAccounts,
      )
        .then((credits) => {
          setCards(credits);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, accessToken, cards]);

  return <MyCardsUI cards={cards} loading={loading} />;
}

export { MyCards };
