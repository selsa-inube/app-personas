import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { IPQRS } from "src/model/entity/pqrs";
import { captureNewError } from "src/services/errors/handleErrors";
import { getPqrsHistory } from "src/services/iclient/pqrs/getPqrsHistory";
import { MyPQRSUI } from "./interface";

const RECORDS_INCREMENT = 4;

function MyPQRS() {
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [pqrsRequests, setPqrsRequests] = useState<IPQRS[]>([]);
  const [visibleRecordsCount, setVisibleRecordsCount] =
    useState(RECORDS_INCREMENT);

  const handleGetPqrsHistory = async () => {
    if (accessToken && user?.identification) {
      setLoading(true);
      try {
        const data = await getPqrsHistory(user.identification, accessToken);
        setPqrsRequests(data);
      } catch (error) {
        captureNewError(
          error,
          {
            inFunction: "handleGetPqrsHistory",
            action: "getPqrsHistory",
            screen: "MyPQRS",
            file: "src/pages/admin/pqrs/MyPQRS/index.tsx",
          },
          { feature: "pqrs" },
        );
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleGetPqrsHistory();
  }, [accessToken, user?.identification]);

  const handleNavigateToPqrsDetails = (id: string) => {
    navigate(`/my-pqrs/details/${id}`);
  };

  const handleLoadMoreRecords = () => {
    setVisibleRecordsCount((prevCount) => prevCount + RECORDS_INCREMENT);
  };

  const visibleRequests = pqrsRequests.slice(0, visibleRecordsCount);
  const totalRecords = pqrsRequests.length;

  const withCreatePQRS = getFlag("general.links.pqrs.create-pqrs").value;

  return (
    <MyPQRSUI
      pqrsRequests={visibleRequests}
      loading={loading}
      totalRecords={totalRecords}
      visibleRecordsCount={visibleRecordsCount}
      withCreatePQRS={withCreatePQRS}
      onNavigateToDetails={handleNavigateToPqrsDetails}
      onLoadMore={handleLoadMoreRecords}
    />
  );
}

export { MyPQRS };
