import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import jsPDF from "jspdf";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { extractAttribute } from "src/utils/products";
import { CreditQuotaUI } from "./interface";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";
import {
  getUsedQuotaData,
  validateCreditQuotaDetail,
  validateCreditQuotas,
} from "./utils";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { formatSecondaryDate } from "src/utils/dates";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const { cards, creditQuotas, creditQuotaDetail, setCreditQuotaDetail } =
    useContext(CardsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>();
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false,
  });
  const [showActionsModal, setShowActionsModal] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_quota_id, user, accessToken, isMobile]);

  useEffect(() => {
    usedQuotaData();
  }, [selectedProduct]);

  const handleSortProduct = async () => {
    if (!card_id || !credit_quota_id || !user || !accessToken) return;

    if (cards.length === 0) return;

    const { newCreditQuotas } = await validateCreditQuotas(
      creditQuotas,
      card_id,
      accessToken,
    );

    const selectedCard = cards.find((card) => card.id === card_id);
    if (!selectedCard) return;

    const cardNumber = extractAttribute(selectedCard.attributes, "card_number");

    if (!cardNumber) return;

    const isCardQuotaValid = newCreditQuotas.every((creditQuota) =>
      cards.some(
        (card) =>
          card.quotaDetails &&
          card.quotaDetails.some(
            (quotaDetail) => quotaDetail === creditQuota.id,
          ),
      ),
    );

    if (!isCardQuotaValid) return;

    const { selectedCreditQuotaDetail } = await validateCreditQuotaDetail(
      cardNumber.value.toString(),
      credit_quota_id,
      accessToken,
      creditQuotaDetail,
    );

    setCreditQuotaDetail(creditQuotaDetail);

    if (!selectedCreditQuotaDetail) return;

    setSelectedProduct({
      creditQuotaDetail: selectedCreditQuotaDetail,
      option: selectedCreditQuotaDetail.id,
    });

    setProductsOptions(
      newCreditQuotas.map((creditQuota) => ({
        id: creditQuota.id,
        value: creditQuota.title,
      })),
    );
  };

  const usedQuotaData = () => {
    if (selectedProduct && selectedProduct.creditQuotaDetail) {
      const {
        currentConsumption,
        accumulatedDebt,
        transactionsProcess,
        usedQuotaValue,
      } = getUsedQuotaData(selectedProduct.creditQuotaDetail);

      if (!usedQuotaValue) return;
      setUsedQuotaModal({
        ...usedQuotaModal,
        data: {
          currentConsumption,
          accumulatedDebt,
          transactionsProcess,
          usedQuotaValue,
        },
      });
    }
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-cards/${card_id}/credit-quota/${id}`);
  };

  if (!selectedProduct) return null;

  const handleUsedQuotaModal = () => {
    setUsedQuotaModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleToggleActionsModal = () => {
    setShowActionsModal(!showActionsModal);
  };

  const handleShareCertificate = () => {
    if (!selectedProduct) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(<><h1>Documento</h1></>),
      (pdf) => {
        const pdfBlob = pdf.output("blob");

        if (navigator.share) {
          navigator.share({
            title: "Extracto",
            text: `${selectedProduct.creditQuotaDetail.id}- ${formatSecondaryDate(today)}`,
            files: [
              new File(
                [pdfBlob],
                `extracto-${selectedProduct.creditQuotaDetail.id}-${formatSecondaryDate(today)}.pdf`,
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

  const handleDownloadExtract = () => {
    if (!selectedProduct) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    doc.setProperties({
      title: `Extracto-${selectedProduct.creditQuotaDetail.id}`,
      subject: "Informe",
      author: `${user.firstName} ${user.firstLastName}`,
      creator: "Sistemas En Línea",
      keywords: "PDF/A",
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(
        <><h1>Extracto</h1></>
      ),
      (pdf) => {
        pdf.save(
          `Extracto-${selectedProduct.creditQuotaDetail.id}-${formatSecondaryDate(today)}.pdf`,
        );
      },
    );
  };

  return (
    <>
      <CreditQuotaUI
        cardId={card_id}
        creditQuotaId={credit_quota_id}
        usedQuotaModal={usedQuotaModal}
        showActionsModal={showActionsModal}
        productsOptions={productsOptions}
        selectedProduct={selectedProduct}
        selectedConsumption={selectedProduct.creditQuotaDetail?.consumptions}
        handleToggleUsedQuotaModal={handleUsedQuotaModal}
        handleChangeProduct={handleChangeProduct}
        onToggleActionsModal={handleToggleActionsModal}
        onShareCertificate={handleShareCertificate}
        onDownloadExtract={handleDownloadExtract}
      />
    </>
  );
}

export { CreditQuota };