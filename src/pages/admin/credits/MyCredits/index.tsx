import { useAuth } from "@inube/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CreditsContext } from "src/context/credits";
import { getCreditsForUser } from "src/services/iclient/credits";
import { MyCreditsUI } from "./interface";

function MyCredits() {
  const { credits, setCredits } = useContext(CreditsContext);
  const [loading, setLoading] = useState(true);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (user && accessToken) {
      getCreditsForUser(user?.identification, accessToken)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, accessToken]);
  return <MyCreditsUI loading={loading} credits={credits} />;
}

export { MyCredits };
