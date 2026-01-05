import { enviroment } from "@config/enviroment";
import { useAuth } from "@inube/auth";
import { certificationsRequestMock } from "@mocks/certifications/certificationsRequest.mocks";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { captureNewError } from "src/services/errors/handleErrors";
import { formatSecondaryDate } from "src/utils/dates";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { useTheme } from "styled-components";
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
  const { getFlag } = useContext(AppContext);

  const withMyPQRS = getFlag("admin.pqrs.pqrs.pqrs-option").value;

  const theme = useTheme();

  useEffect(() => {
    setCertifications(certificationsRequestMock);
  }, []);

  const handleDownloadCertificate = async () => {
    if (!accessToken) return;
    try {
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
        author: `${user.firstName} ${user.lastName}`,
        creator: enviroment.CLIENT_NAME,
        keywords: "PDF/A",
      });

      const documentElement = await getAccountStatementDocument(
        user,
        savings,
        cards,
        commitments,
        credits,
        accessToken,
        theme,
        withMyPQRS,
      );

      convertHTMLToPDF(
        doc,
        convertJSXToHTML(documentElement),
        [16, 0, 16, 0],
        (pdf) => {
          pdf.save(`estado-de-cuenta-${formatSecondaryDate(today)}.pdf`);
        },
      );
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "handleDownloadCertificate",
          action: "convertHTMLToPDF",
          screen: "CertificationRequest",
          file: "src/pages/request/certifications/index.tsx",
        },
        { feature: "certifications" },
      );
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
