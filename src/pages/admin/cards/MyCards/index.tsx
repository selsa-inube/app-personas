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

  useEffect(() => {
    if (accessToken && cards.length === 0) {
      setLoading(true);
      getCardsForUser(user.identification, accessToken, savings.savingsAccounts)
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
  }, [user, accessToken]);

  return <MyCardsUI cards={cards} loading={loading} />;
}

export { MyCards };
