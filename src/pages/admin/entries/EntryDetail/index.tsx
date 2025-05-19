import { INew } from "@components/cards/RequestNews/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { IRequest } from "src/model/entity/request";
import { getNewsForRequest } from "src/services/iclient/requests/getNews";
import { entryTabs } from "./config/tabs";
import { EntryDetailUI } from "./interface";
import { validateEntry } from "./utils";

function EntryDetail() {
  const { accessToken } = useAuth();
  const { entry_id } = useParams();
  const [attachModal, setAttachModal] = useState({
    show: false,
    requirementId: "",
    documentType: "",
  });

  const [selectedEntry, setSelectedEntry] = useState<IRequest>();
  const { entries, setEntries } = useContext(RequestsContext);
  const { user, serviceDomains, loadServiceDomains } = useContext(AppContext);

  const [selectedTab, setSelectedTab] = useState(entryTabs.features.id);
  const [news, setNews] = useState<INew[]>([]);

  const validateEnums = async () => {
    if (!accessToken) return;

    if (serviceDomains.integratedbanks.length > 0) return;

    loadServiceDomains(["identificationtype"], accessToken);
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  const handleSortEntry = async () => {
    if (!entry_id || !user || !accessToken) return;

    const { selectedEntry, newEntries } = await validateEntry(
      entries,
      entry_id,
      user.identification,
      accessToken,
    );

    setEntries(newEntries);

    if (!selectedEntry) return;

    setSelectedEntry(selectedEntry);

    const news = await getNewsForRequest(selectedEntry.id, accessToken);

    setNews(news);
  };

  useEffect(() => {
    handleSortEntry();
  }, [accessToken, user, entry_id]);

  const handleOpenAttachModal = (
    requirementId: string,
    documentType: string,
  ) => {
    setAttachModal({
      show: true,
      requirementId,
      documentType,
    });
  };

  const handleCloseAttachModal = () => {
    setAttachModal({
      show: false,
      requirementId: "",
      documentType: "",
    });
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  if (!selectedEntry) return null;

  return (
    <EntryDetailUI
      selectedEntry={selectedEntry}
      entryId={entry_id}
      attachModal={attachModal}
      selectedTab={selectedTab}
      news={news}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onTabChange={handleTabChange}
    />
  );
}

export { EntryDetail };
