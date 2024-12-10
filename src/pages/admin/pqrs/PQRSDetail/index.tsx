import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@inube/auth";
import { AppContext } from "src/context/app";
import { getDetailsPqrs } from "src/services/iclient/pqrs/getDetailsPqrs";
import { IPQRS } from "src/model/entity/pqrs";
import { INew } from "@components/cards/RequestNews/types";
import { MyPQRSDetailsUI } from "./interface";

function MyPQRSDetails() {
  const [pqrsDetails, setPqrsDetails] = useState<IPQRS | null>(null);

  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { pqrs_id: pqrsId } = useParams();

  useEffect(() => {
    const fetchPqrsRequests = async () => {
      if (accessToken && user?.identification && pqrsId) {
        try {
          const data = await getDetailsPqrs(
            user.identification,
            accessToken,
            pqrsId,
          );
          setPqrsDetails(data);
        } catch (error) {
          console.error("Error al obtener los detalles de la pqrs", error);
        }
      }
    };

    fetchPqrsRequests();
  }, [accessToken, user?.identification, pqrsId]);

  const news: INew[] = [];

  return <MyPQRSDetailsUI pqrsDetails={pqrsDetails} news={news} />;
}

export { MyPQRSDetails };