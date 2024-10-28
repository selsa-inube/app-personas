import { IAid } from "src/model/entity/service";
import { useContext, useEffect, useState } from "react";
import { certificationsRequestMock } from "@mocks/certifications/certificationsRequest.mocks";
import jsPDF from "jspdf";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { formatSecondaryDate } from "src/utils/dates";
import { CertificationRequestUI } from "./interface";
import { getAccountStatementDocument } from "./AccountStatementDocument/utilRenders";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { CardsContext } from "src/context/cards";
import { useAuth } from "@inube/auth";

function CertificationRequest() {
  const { user } = useContext(AppContext);
  const { accessToken } = useAuth();
  const { savings, commitments } = useContext(SavingsContext);
  const { cards } = useContext(CardsContext);
  const [certifications, setCertifications] = useState<IAid[]>([]);

  useEffect(() => {
    setCertifications(certificationsRequestMock);
  }, []);

  const handleDownloadCertificate = async () => {
    if (!accessToken) return;
    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    try {
      const documentElement = await getAccountStatementDocument(
        user,
        savings,
        cards,
        commitments,
        accessToken,
      );

      convertHTMLToPDF(
        doc,
        convertJSXToHTML(documentElement),
        (pdf) => {
          pdf.save(`estado-de-cuenta-${formatSecondaryDate(today)}.pdf`);
        },
      );
    } catch (error) {
      console.error("Error generating the document:", error);
    }
  };

  return (
    <CertificationRequestUI
      certifications={certifications}
      handleDownloadCertificate={handleDownloadCertificate}
    />
  );
}

export { CertificationRequest };