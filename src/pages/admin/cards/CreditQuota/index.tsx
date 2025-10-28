import { enviroment } from "@config/enviroment";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { formatSecondaryDate } from "src/utils/dates";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { extractAttribute } from "src/utils/products";
import { CreditQuotaUI } from "./interface";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";
import { getCreditLimitDocument } from "./utilRenders";
import {
  getUsedQuotaData,
  validateCreditQuotaDetail,
  validateCreditQuotas,
} from "./utils";

function CreditQuota() {
  const { card_id, credit_quota_id } = useParams();
  const { cards, creditQuotas, creditQuotaDetail, setCreditQuotaDetail } =
    useContext(CardsContext);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<IOption[]>();
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false,
  });
  const [showActionsModal, setShowActionsModal] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);

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
        value: creditQuota.id,
        label: creditQuota.title,
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

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-cards/${card_id}/credit-quota/${value}`);
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
    if (!selectedProduct || !creditQuotas) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    const creditLimitDocument = getCreditLimitDocument(
      user,
      selectedProduct,
      creditQuotas,
      cards,
      `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/${enviroment.BUSINESS_UNIT}-logo.png`,
    );

    if (!creditLimitDocument) {
      return;
    }

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(creditLimitDocument),
      [16, 0, 16, 0],
      (pdf) => {
        const pdfBlob = pdf.output("blob");

        if (navigator.share) {
          navigator
            .share({
              title: `Extracto-cupo-crédito-${user.identification}`,
              text: `${user.identification}- ${formatSecondaryDate(today)}`,
              files: [
                new File(
                  [pdfBlob],
                  `Extracto-cupo-crédito-${user.identification}-${formatSecondaryDate(today)}.pdf`,
                  {
                    type: "application/pdf",
                  },
                ),
              ],
            })
            .catch(() => {
              console.error(
                "No se pudo generar el documento de crédito. Verifique los datos.",
              );
            });
        } else {
          console.warn(
            "No se pudo generar el documento de crédito. Verifique los datos.",
          );
        }
      },
    );
  };

  const handleDownloadExtract = () => {
    if (!selectedProduct || !creditQuotas) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    doc.setProperties({
      title: `Extracto-cupo-crédito-${user.identification}`,
      subject: "Informe",
      author: `${user.firstName} ${user.lastName}`,
      creator: enviroment.CLIENT_NAME,
      keywords: "PDF/A",
    });

    const creditLimitDocument = getCreditLimitDocument(
      user,
      selectedProduct,
      creditQuotas,
      cards,
      `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/${enviroment.BUSINESS_UNIT}-logo.png`,
    );

    if (!creditLimitDocument) {
      return;
    }

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(creditLimitDocument),
      [16, 0, 16, 0],
      (pdf) => {
        pdf.save(
          `Extracto-cupo-crédito-${user.identification}-${formatSecondaryDate(today)}.pdf`,
        );
      },
    );
  };

  if (!getFlag("admin.cards.cards.my-cards").value) {
    return <Navigate to="/" />;
  }

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
