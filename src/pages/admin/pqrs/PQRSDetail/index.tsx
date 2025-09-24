import { INew } from "@components/cards/RequestNews/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "src/context/app";
import { IPQRS } from "src/model/entity/pqrs";
import { getDetailsPqrs } from "src/services/iclient/pqrs/getDetailsPqrs";
import { getNewsForPqrs } from "src/services/iclient/pqrs/getNewsPqrs";
import { MyPQRSDetailsUI } from "./interface";

function MyPQRSDetails() {
  const [pqrsDetails, setPqrsDetails] = useState<IPQRS>();
  const [newsPqrs, setNewsPqrs] = useState<INew[]>([]);

  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { pqrs_id: pqrsId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || !pqrsId) return;

      try {
        if (user?.identification) {
          const details = await getDetailsPqrs(
            user.identification,
            accessToken,
            pqrsId,
          );
          setPqrsDetails(details);
        }

        const news = await getNewsForPqrs(pqrsId, accessToken);
        setNewsPqrs(news);
      } catch (error) {
        console.error("Error al obtener datos de la PQRS", error);
      }
    };

    fetchData();
  }, [accessToken, user?.identification, pqrsId]);

  return <MyPQRSDetailsUI pqrsDetails={pqrsDetails} news={newsPqrs} />;
}

export { MyPQRSDetails };
