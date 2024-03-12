import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { cardsMock } from "@mocks/products/cards/cards.mock";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { HomeUI } from "./interface";

function Home() {
  const { credits, cards, setCredits, setCards } = useContext(CreditsContext);
  const { commitments, savings, setCommitments, setSavings } =
    useContext(SavingsContext);
  const { user, accessToken } = useAuth();
  const [loadingSavings, setLoadingSavings] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const validateCommitments = () => {
    if (!user || !accessToken) return;
    if (commitments.length === 0) {
      getSavingsCommitmentsForUser(user?.identification, accessToken)
        .then((commitments) => {
          setCommitments(commitments);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  };

  const validateProducts = () => {
    if (!user || !accessToken) return;

    const combinedSavings = [
      ...savings.savingsAccounts,
      ...savings.savingsContributions,
      ...savings.cdats,
      ...savings.programmedSavings,
    ];

    if (combinedSavings.length === 0) {
      setLoadingSavings(true);
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoadingSavings(false);
        });
    }
    if (credits.length === 0) {
      setLoadingCredits(true);
      getCreditsForUser(user?.identification, accessToken)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoadingCredits(false);
        });
    }
    if (cards.length === 0) {
      setLoadingCards(true);
      setTimeout(() => {
        setCards(cardsMock);
        setLoadingCards(false);
      }, 1000);
    }
  };

  useEffect(() => {
    validateCommitments();
  }, [savings]);

  useEffect(() => {
    validateProducts();
  }, [user, accessToken]);

  return (
    <HomeUI
      productsCommitments={commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={savings.programmedSavings}
      credits={credits}
      cards={cards}
      loadingSavings={loadingSavings}
      loadingCredits={loadingCredits}
      loadingCards={loadingCards}
      isTablet={isTablet}
    />
  );
}

export { Home };
