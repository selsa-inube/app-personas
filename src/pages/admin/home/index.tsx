import { useAuth } from "@inube/auth";
import { IMessage } from "@ptypes/messages.types";
import { useContext, useEffect, useState } from "react";
import { MdSentimentNeutral } from "react-icons/md";
import { CreditsContext } from "src/context/credits";
import { getCreditsForUser } from "src/services/iclient/credits";
import { initialMessageState } from "src/utils/messages";
import { HomeUI } from "./interface";
import {
  getInvestmentsProducts,
  productsCommitments,
  savingsAccountsMock,
  savingsStatutoryContributionsMock,
} from "./utils";

function Home() {
  const { credits, setCredits } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();
  const [message, setMessage] = useState<IMessage>(initialMessageState);

  const cdats = user && getInvestmentsProducts(user.identification, "CD");
  const programmedSavings =
    user && getInvestmentsProducts(user.identification, "AP");

  useEffect(() => {
    console.log(accessToken);
    if (user && accessToken) {
      getCreditsForUser(user?.identification, accessToken)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          setMessage({
            show: true,
            title: "¡Uy, algo salió mal!",
            description: "Tuvimos un problema al obtener los creditos.",
            icon: <MdSentimentNeutral size={18} />,
            appearance: "error",
          });
        });
    }
  }, [user, accessToken]);

  const handleCloseMessage = () => {
    setMessage(initialMessageState);
  };

  return (
    <HomeUI
      productsCommitments={productsCommitments}
      savingsAccountsMock={savingsAccountsMock}
      savingsStatutoryContributionsMock={savingsStatutoryContributionsMock}
      cdats={cdats}
      programmedSavings={programmedSavings}
      credits={credits}
      message={message}
      onCloseMessage={handleCloseMessage}
    />
  );
}

export { Home };
