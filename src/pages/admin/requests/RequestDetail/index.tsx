import { useAuth } from "@inube/auth";
import { requestsMock } from "@mocks/products/credits/requests.mocks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { getRequestDetail } from "src/services/iclient/requests/getRequestDetail";
import { RequestDetailUI } from "./interface";

const MAX_SIZE_PER_FILE = 2.5;

function RequestDetail() {
  const [requestData, setRequestData] = useState<IRequest>();
  const { accessToken } = useAuth();
  const { request_id } = useParams();
  const [attachModal, setAttachModal] = useState({
    show: false,
    id: "",
  });
  const [selectedDocuments, setSelectedDocuments] = useState<
    ISelectedDocument[]
  >([]);

  const handleGetRequestDetail = () => {
    if (!accessToken || !request_id) return;

    getRequestDetail(request_id, accessToken)
      .then((newRequest) => {
        setRequestData(newRequest);

        if (!newRequest) return;
        setSelectedDocuments(newRequest.documentaryRequirements);
      })
      .catch((error) => {
        setRequestData(requestsMock[0]); // TEMP
        setSelectedDocuments(requestsMock[0].documentaryRequirements);

        console.info(error.message);
      });
  };

  useEffect(() => {
    handleGetRequestDetail();
  }, []);

  const handleOpenAttachModal = (id: string) => {
    setAttachModal({
      show: true,
      id,
    });
  };

  const handleCloseAttachModal = () => {
    setAttachModal({
      show: false,
      id: "",
    });
  };

  const handleSelectDocument = async (file: File, id: string) => {
    setSelectedDocuments([
      ...selectedDocuments,
      {
        file,
        id,
      },
    ]);
  };

  if (!requestData) return null;

  return (
    <RequestDetailUI
      requestData={requestData}
      requestId={request_id}
      attachModal={attachModal}
      maxFileSize={MAX_SIZE_PER_FILE}
      selectedDocuments={selectedDocuments}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onSelectDocument={handleSelectDocument}
    />
  );
}

export { RequestDetail };
