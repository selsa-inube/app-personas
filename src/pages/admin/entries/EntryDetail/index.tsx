import { INew } from "@components/cards/RequestNews/types";
import { theme } from "@config/theme";
import { useAuth } from "@inube/auth";
import { convertHTMLToPDF, convertJSXToHTML } from "@utils/print";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { IRequest } from "src/model/entity/request";
import { getNewsForRequest } from "src/services/iclient/requests/getNews";
import { entryTabs } from "./config/tabs";
import { EntryDetailUI } from "./interface";
import { getEntryDocument } from "./utilRenders";
import { validateEntry } from "./utils";

function EntryDetail() {
  const { accessToken } = useAuth();
  const { entry_id } = useParams();
  const [showActionsModal, setShowActionsModal] = useState(false);

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

  const handleToggleActionsModal = () => {
    setShowActionsModal(!showActionsModal);
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const handleDownloadDocument = () => {
    if (!selectedEntry) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(
        getEntryDocument(selectedEntry, theme.images.logo, serviceDomains),
      ),
      [16, 0, 16, 0],
      (pdf) => {
        pdf.save(`comprobante-entrada-${selectedEntry.trackingCode}.pdf`);
      },
    );
  };

  const handleShareDocument = () => {
    if (!selectedEntry) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(
        getEntryDocument(selectedEntry, theme.images.logo, serviceDomains),
      ),
      [16, 0, 16, 0],
      (pdf) => {
        const pdfBlob = pdf.output("blob");

        if (navigator.share) {
          navigator.share({
            title: "Comprobante de entrada",
            text: `Comprobante de entrada ${selectedEntry.trackingCode}`,
            files: [
              new File(
                [pdfBlob],
                `comprobante-entrada-${selectedEntry.trackingCode}.pdf`,
                {
                  type: "application/pdf",
                },
              ),
            ],
          });
        } else {
          console.warn("Web Share API is not supported in this browser");
        }
      },
    );
  };

  if (!selectedEntry) return null;

  return (
    <EntryDetailUI
      selectedEntry={selectedEntry}
      entryId={entry_id}
      showActionsModal={showActionsModal}
      selectedTab={selectedTab}
      news={news}
      onDownloadDocument={handleDownloadDocument}
      onShareDocument={handleShareDocument}
      onToggleActionsModalModal={handleToggleActionsModal}
      onTabChange={handleTabChange}
    />
  );
}

export { EntryDetail };
