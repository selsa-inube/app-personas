import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@inube/auth";
import { AppContext } from "src/context/app";
import { getDetailsPqrs } from "src/services/iclient/pqrs/getDetailsPqrs";
import { IPQRS } from "src/model/entity/pqrs";
import { INew } from "@components/cards/RequestNews/types";
import { MyPQRSDetailsUI } from "./interface";
import { getNewsForPqrs } from "src/services/iclient/pqrs/getNewsPqrs";

function MyPQRSDetails() {
  const [pqrsDetails, setPqrsDetails] = useState<IPQRS | null>(null);
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
