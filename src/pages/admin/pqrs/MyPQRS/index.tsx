import { useState, useEffect } from "react";
import { pqrsHistoryMock } from "@mocks/pqrs/pqrsHistory.mocks";
import { MyPQRSUI } from "./interface";
import { useNavigate } from "react-router-dom";

const RECORDS_INCREMENT = 4;

function MyPQRS() {
  const [loading, setLoading] = useState(true);
  const [visibleRecordsCount, setVisibleRecordsCount] =
    useState(RECORDS_INCREMENT);

  const navigate = useNavigate();

  useEffect(() => {
    const simulateDataFetch = () => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    };
    simulateDataFetch();
  }, []);

  const handleNavigateToPqrsDetails = (id: string) => {
    navigate(`/my-pqrs/details/${id}`);
  };

  const handleLoadMoreRecords = () => {
    setVisibleRecordsCount((prevCount) => prevCount + RECORDS_INCREMENT);
  };

  const pqrsRequests = pqrsHistoryMock.slice(0, visibleRecordsCount);
  const totalRecords = pqrsHistoryMock.length;

  return (
    <MyPQRSUI
      pqrsRequests={pqrsRequests}
      loading={loading}
      totalRecords={totalRecords}
      visibleRecordsCount={visibleRecordsCount}
      onNavigateToDetails={handleNavigateToPqrsDetails}
      onLoadMore={handleLoadMoreRecords}
    />
  );
}

export { MyPQRS };
