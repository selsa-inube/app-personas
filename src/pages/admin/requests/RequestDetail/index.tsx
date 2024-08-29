import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { RequestDetailUI } from "./interface";
import { validateRequest } from "./utils";

const MAX_SIZE_PER_FILE = 2.5;

function RequestDetail() {
  const { accessToken } = useAuth();
  const { request_id } = useParams();
  const [attachModal, setAttachModal] = useState({
    show: false,
    id: "",
  });
  const [selectedDocuments, setSelectedDocuments] = useState<
    ISelectedDocument[]
  >([]);
  const [selectedRequest, setSelectedRequest] = useState<IRequest>();
  const { requests, setRequests } = useContext(RequestsContext);
  const { user } = useContext(AppContext);

  const handleSortRequest = async () => {
    if (!request_id || !user || !accessToken) return;

    const { selectedRequest, newRequests } = await validateRequest(
      requests,
      request_id,
      user.identification,
      accessToken,
    );

    setRequests(newRequests);

    if (!selectedRequest) return;

    setSelectedRequest(selectedRequest);
  };
  useEffect(() => {
    handleSortRequest();
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

  if (!selectedRequest) return null;

  return (
    <RequestDetailUI
      selectedRequest={selectedRequest}
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
