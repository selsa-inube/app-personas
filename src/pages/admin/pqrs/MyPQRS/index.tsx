import { useState, useEffect, useContext } from "react";
import { MyPQRSUI } from "./interface";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { useAuth } from "@inube/auth";
import { getPqrsHistory } from "src/services/iclient/pqrs/getPqrsHistory";
import { IPQRS } from "src/model/entity/pqrs";

const RECORDS_INCREMENT = 4;

function MyPQRS() {
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [pqrsRequests, setPqrsRequests] = useState<IPQRS[]>([]);
  const [visibleRecordsCount, setVisibleRecordsCount] =
    useState(RECORDS_INCREMENT);

  useEffect(() => {
    const fetchPqrsRequests = async () => {
      if (accessToken && user?.identification) {
        setLoading(true);
        try {
          const data = await getPqrsHistory(user.identification, accessToken);
          setPqrsRequests(data);
        } catch (error) {
          console.error("Error al obtener el historico de pqrs", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPqrsRequests();
  }, [accessToken, user?.identification]);

  const handleNavigateToPqrsDetails = (id: string) => {
    navigate(`/my-pqrs/details/${id}`);
  };

  const handleLoadMoreRecords = () => {
    setVisibleRecordsCount((prevCount) => prevCount + RECORDS_INCREMENT);
  };

  const visibleRequests = pqrsRequests.slice(0, visibleRecordsCount);
  const totalRecords = pqrsRequests.length;

  return (
    <MyPQRSUI
      pqrsRequests={visibleRequests}
      loading={loading}
      totalRecords={totalRecords}
      visibleRecordsCount={visibleRecordsCount}
      onNavigateToDetails={handleNavigateToPqrsDetails}
      onLoadMore={handleLoadMoreRecords}
    />
  );
}

export { MyPQRS };
