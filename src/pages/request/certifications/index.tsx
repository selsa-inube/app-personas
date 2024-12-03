import { useAuth } from "@inube/auth";
import { certificationsRequestMock } from "@mocks/certifications/certificationsRequest.mocks";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { formatSecondaryDate } from "src/utils/dates";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { getAccountStatementDocument } from "./AccountStatementDocument/utilRenders";
import { CertificationRequestUI } from "./interface";
import { IAccountStatement } from "./types";

function CertificationRequest() {
  const { user } = useContext(AppContext);
  const { accessToken } = useAuth();
  const { savings, commitments } = useContext(SavingsContext);
  const { cards } = useContext(CardsContext);
  const { credits } = useContext(CreditsContext);
  const [certifications, setCertifications] = useState<IAccountStatement[]>([]);

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

    doc.setProperties({
      title: "Estado de Cuenta",
      subject: "Estado de Cuenta PDF",
      author: `${user.firstName} ${user.firstLastName}`,
      creator: "Fondecom",
      keywords: "PDF/A",
    });

    try {
      const documentElement = await getAccountStatementDocument(
        user,
        savings,
        cards,
        commitments,
        credits,
        accessToken,
      );

      convertHTMLToPDF(doc, convertJSXToHTML(documentElement), (pdf) => {
        pdf.save(`estado-de-cuenta-${formatSecondaryDate(today)}.pdf`);
      });
    } catch (error) {
      console.error("Error generating the document:", error);
    }
  };

  return (
    <CertificationRequestUI
      certifications={certifications}
      onDownloadCertificate={handleDownloadCertificate}
    />
  );
}

export { CertificationRequest };
