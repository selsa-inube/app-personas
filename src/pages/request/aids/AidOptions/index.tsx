import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IAid } from "src/model/entity/service";
import { getAidsForUser } from "src/services/iclient/aids/getAids";
import { AidOptionsUI } from "./interfaces";

function AidOptions() {
  const [aids, setAids] = useState<IAid[]>([]);
  const { user } = useContext(AppContext);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aids.length > 0 || !accessToken) return;

    getAidsForUser(user.identification, accessToken).then((aids) => {
      setAids(aids);
      setLoading(false);
    });
  }, []);

  return <AidOptionsUI aids={aids} loading={loading} />;
}

export { AidOptions };
