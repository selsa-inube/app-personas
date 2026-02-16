import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { IProduct } from "src/model/entity/product";
import { captureNewError } from "src/services/errors/handleErrors";
import { getCardsForUser } from "src/services/iclient/cards/getCards";
import { getCreditQuotasForCard } from "src/services/iclient/cards/getCreditQuotas";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { HomeUI } from "./interface";

function Home() {
  const { credits, setCredits } = useContext(CreditsContext);
  const { cards, setCards } = useContext(CardsContext);
  const { commitments, savings, setCommitments, setSavings } =
    useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [loadingSavings, setLoadingSavings] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const [creditQuotas, setCreditQuotas] = useState<IProduct[]>([]);

  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const validateProducts = async () => {
    if (!accessToken || !user.identification) return;

    const combinedSavings = [
      ...savings.savingsAccounts,
      ...savings.savingsContributions,
      ...savings.cdats,
      ...savings.programmedSavings,
    ];

    credits.length === 0 && setLoadingCredits(true);

    Promise.all([
      getSavingsCommitmentsForUser(user.identification, accessToken),
      getCreditsForUser(user.identification, accessToken)
    ])
      .then(([savingsCommitments, credits]) => {
        const creditsAsCommitments = credits.map(credit => ({
          id: credit.id,
          title: credit.title,
          type: credit.type,
          description: credit.description,
          attributes: credit.attributes.map(attr => ({
            ...attr,
            label: "Próximo Pago"
          })),
          products: [credit.id],
          ...(credit.tags && credit.tags.length > 0 && { tag: credit.tags[0] }),
        }));

        const allCommitments = [...savingsCommitments, ...creditsAsCommitments];
        const activeCommitments = allCommitments.filter((commitment) =>
          commitment.attributes.some((attr) => attr.id === "next_payment"),
        );
        setCommitments(activeCommitments);
        setCredits(credits);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "validateProducts",
            action: "getSavingsCommitmentsForUser & getCreditsForUser",
            screen: "Home",
            file: "src/pages/admin/home/index.tsx",
          },
          { feature: "home" },
        );
      })
      .finally(() => {
        setLoadingCredits(false);
      });

    let savingAccountsResume: IProduct[] = savings.savingsAccounts.map(
      (savingAccount) => ({
        id: savingAccount.id,
        title: savingAccount.title,
        description: savingAccount.description,
        type: savingAccount.type,
        attributes: savingAccount.attributes,
      }),
    );

    combinedSavings.length === 0 && setLoadingSavings(true);
    cards.length === 0 && setLoadingCards(true);
    try {
      const newSavings = await getSavingsForUser(
        user.identification,
        accessToken,
      );

      setSavings(newSavings);
      savingAccountsResume = newSavings.savingsAccounts.map(
        (savingAccount) => ({
          id: savingAccount.id,
          title: savingAccount.title,
          description: savingAccount.description,
          type: savingAccount.type,
          attributes: savingAccount.attributes,
        }),
      );
    } catch (error) {
      console.info(error);

      captureNewError(
        error,
        {
          inFunction: "validateProducts",
          action: "getSavingsForUser",
          screen: "Home",
          file: "src/pages/admin/home/index.tsx",
        },
        { feature: "home" },
      );
    } finally {
      setLoadingSavings(false);
    }

    getCardsForUser(user.identification, accessToken, savingAccountsResume)
      .then(async (cards) => {
        setCards(cards);
        if (cards.length > 0) {
          try {
            const allCreditQuotas = await Promise.all(
              cards.map(async (card) => {
                const cardNumber = card.attributes.find((attr) => attr.id === "card_number")?.value;
                if (cardNumber) {
                  return await getCreditQuotasForCard(
                    cardNumber.toString(),
                    accessToken
                  );
                }
                return [];
              })
            );
            const flattenedQuotas = allCreditQuotas.flat();
            setCreditQuotas(flattenedQuotas);
          } catch (error) {
            console.info("Error loading credit quotas:", error);
          }
        }
      })
      .finally(() => {
        setLoadingCards(false);
      });
  };

  useEffect(() => {
    validateProducts();
  }, [user, accessToken]);

  return (
    <HomeUI
      commitments={commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={savings.programmedSavings}
      credits={credits}
      cards={cards}
      creditQuotas={creditQuotas}
      loadingSavings={loadingSavings}
      loadingCredits={loadingCredits}
      loadingCards={loadingCards}
      isDesktop={isDesktop}
      isMobile={isMobile}
    />
  );
}

export { Home };
