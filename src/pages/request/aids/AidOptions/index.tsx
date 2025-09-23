import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IAid } from "src/model/entity/service";
import { captureNewError } from "src/services/errors/handleErrors";
import { getAidsForUser } from "src/services/iclient/aids/getAids";
import { AidOptionsUI } from "./interfaces";

function AidOptions() {
  const [aids, setAids] = useState<IAid[]>([]);
  const { user } = useContext(AppContext);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (aids.length > 0 || !accessToken) return;

    getAidsForUser(user.identification, accessToken)
      .then((aids) => {
        setAids(aids);
        setLoading(false);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "AidOptions",
            action: "getAidsForUser",
            screen: "AidOptions",
            file: "src/pages/request/aids/AidOptions/index.tsx",
          },
          { feature: "request-aid" },
        );
        setError(true);
        setLoading(false);
      });
  }, []);

  return <AidOptionsUI aids={aids} loading={loading} errorMessage={error} />;
}

export { AidOptions };
