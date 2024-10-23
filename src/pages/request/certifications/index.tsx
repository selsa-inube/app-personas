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

function CertificationRequest() {
  const [certifications, setCertifications] = useState<IAid[]>([]);
  const { user } = useContext(AppContext);
  const { savings } = useContext(SavingsContext);

  useEffect(() => {
    setCertifications(certificationsRequestMock);
  }, []);

  const handleDownloadCertificate = () => {
    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(getAccountStatementDocument(user, savings)),
      (pdf) => {
        pdf.save(`estado-de-cuenta-${formatSecondaryDate(today)}.pdf`);
      },
    );
  };

  return (
    <CertificationRequestUI
      certifications={certifications}
      handleDownloadCertificate={handleDownloadCertificate}
    />
  );
}

export { CertificationRequest };
