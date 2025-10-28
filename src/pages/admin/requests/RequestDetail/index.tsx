import { INew } from "@components/cards/RequestNews/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "src/context/app";
import { IServiceDomains } from "src/context/app/types";
import { RequestsContext } from "src/context/requests";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { getNewsForRequest } from "src/services/iclient/requests/getNews";
import { requestTabs } from "./config/tabs";
import { RequestDetailUI } from "./interface";
import { validateRequest } from "./utils";

const MAX_SIZE_PER_FILE = 2.5;

function RequestDetail() {
  const { accessToken } = useAuth();
  const { request_id } = useParams();
  const [attachModal, setAttachModal] = useState({
    show: false,
    requirementDocument: {} as ISelectedDocument,
  });
  const [selectedDocuments, setSelectedDocuments] = useState<
    ISelectedDocument[]
  >([]);
  const [selectedRequest, setSelectedRequest] = useState<IRequest>();
  const { requests, setRequests } = useContext(RequestsContext);
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);

  const [selectedTab, setSelectedTab] = useState(requestTabs.features.id);
  const [news, setNews] = useState<INew[]>([]);

  const validateEnums = async () => {
    if (!accessToken) return;

    const domainsToLoad: (keyof IServiceDomains)[] = [];

    if (serviceDomains.identificationtype.length === 0) {
      domainsToLoad.push("identificationtype");
    }

    if (serviceDomains.countries.length === 0) {
      domainsToLoad.push("countries");
    }

    if (serviceDomains.integratedbanks.length === 0) {
      domainsToLoad.push("integratedbanks");
    }

    if (domainsToLoad.length === 0) return;

    loadServiceDomains(domainsToLoad, accessToken);
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  const handleSortRequest = async () => {
    if (!request_id || !user || !accessToken) return;

    const { selectedRequest, newRequests } = await validateRequest(
      requests,
      request_id,
      user.identification,
      accessToken,
      user,
    );

    setRequests(newRequests);

    if (!selectedRequest) return;

    setSelectedRequest(selectedRequest);

    const news = await getNewsForRequest(selectedRequest.id, accessToken);

    setNews(news);
  };

  useEffect(() => {
    handleSortRequest();
  }, [accessToken, user, request_id]);

  const handleSelectDocument = async (documents: ISelectedDocument[]) => {
    setSelectedDocuments([...selectedDocuments, ...documents]);
  };

  const handleRemoveDocument = (
    id: string,
    documentType?: string,
    sequence?: number,
  ) => {
    setSelectedDocuments(
      selectedDocuments.filter((document) => document.id !== id),
    );

    if (!accessToken || !documentType || !sequence) return;

    removeDocument(
      {
        documentType,
        sequence,
        customerCode: user.identification,
      },
      accessToken,
    );
  };

  const handleOpenAttachModal = (requirementDocument: ISelectedDocument) => {
    setAttachModal({
      show: true,
      requirementDocument,
    });
  };

  const handleCloseAttachModal = () => {
    setAttachModal({
      show: false,
      requirementDocument: {} as ISelectedDocument,
    });
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  if (!selectedRequest) return null;

  return (
    <RequestDetailUI
      selectedRequest={selectedRequest}
      requestId={request_id}
      attachModal={attachModal}
      maxFileSize={MAX_SIZE_PER_FILE}
      selectedDocuments={selectedDocuments}
      selectedTab={selectedTab}
      news={news}
      serviceDomains={serviceDomains}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onSelectDocument={handleSelectDocument}
      onRemoveDocument={handleRemoveDocument}
      onTabChange={handleTabChange}
    />
  );
}

export { RequestDetail };
