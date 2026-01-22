import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { AppContext } from "src/context/app";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { MyCreditsUI } from "./interface";

function MyCredits() {
  const { credits, setCredits } = useContext(CreditsContext);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!accessToken || !user.identification) return;

    setLoading(true);

    getCreditsForUser(user.identification, accessToken)
      .then((credits) => {
        setCredits(credits);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, accessToken]);

  return (
    <MyCreditsUI
      loading={loading}
      credits={credits}
    />
  );
}

export { MyCredits };
