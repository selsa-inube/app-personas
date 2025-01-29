import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption, useFlag } from "@inubekit/inubekit";
import { sendTransferRequest } from "@pages/admin/transfers/TransferOptions/utils";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { EProductType } from "src/model/entity/product";
import { cancelCdat } from "src/services/iclient/savings/cancelCdat";
import { ICancelCdatRequest } from "src/services/iclient/savings/cancelCdat/types";
import { cancelProgrammedSaving } from "src/services/iclient/savings/cancelProgrammedSaving";
import { ICancelProgrammedSavingRequest } from "src/services/iclient/savings/cancelProgrammedSaving/types";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { modifyActionCdat } from "src/services/iclient/savings/modifyActionCdat";
import { modifyActionProgrammedSaving } from "src/services/iclient/savings/modifyActionProgrammedSaving";
import { IModifyActionProgrammedSavingRequest } from "src/services/iclient/savings/modifyActionProgrammedSaving/types";
import { modifyQuotaProgrammedSaving } from "src/services/iclient/savings/modifyQuotaProgrammedSaving";
import { IModifyQuotaProgrammedSavingRequest } from "src/services/iclient/savings/modifyQuotaProgrammedSaving/types";
import { formatSecondaryDate } from "src/utils/dates";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { extractAttribute } from "src/utils/products";
import { SavingsAccountUI } from "./interface";
import {
  IBeneficiariesModalState,
  ICommitmentsModalState,
  IReimbursementModalState,
  ISelectedProductState,
} from "./types";
import {
  getCdatCertificateDocument,
  getSavingsAccountDocument,
} from "./utilRenders";
import { validateSaving } from "./utils";
import { enviroment } from "@config/enviroment";

function SavingsAccount() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { savings, commitments, setSavings, setCommitments } =
    useContext(SavingsContext);
  const [beneficiariesModal, setBeneficiariesModal] =
    useState<IBeneficiariesModalState>({
      show: false,
      data: [],
    });
  const [reimbursementModal, setReimbursementModal] =
    useState<IReimbursementModalState>({
      show: false,
      data: [],
    });
  const [commitmentsModal, setCommitmentsModal] =
    useState<ICommitmentsModalState>({
      show: false,
      data: [],
    });
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showChangeQuotaModal, setShowChangeQuotaModal] = useState(false);
  const [showModifyActionModal, setShowModifyActionModal] = useState(false);
  const [showCancelSavingModal, setShowCancelSavingModal] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const { getFlag } = useContext(AppContext);
  const { addFlag } = useFlag();

  const isMobile = useMediaQuery("(max-width: 750px)");

  const getBeneficiaries = () => {
    if (!selectedProduct) return;

    const beneficiariesAttribute = selectedProduct.saving.attributes.find(
      (attr) => attr.id === "beneficiaries",
    );

    if (beneficiariesAttribute && Array.isArray(beneficiariesAttribute.value)) {
      setBeneficiariesModal({
        ...beneficiariesModal,
        data: beneficiariesAttribute.value,
      });
    }
  };

  const getReimbursement = () => {
    if (!selectedProduct) return;

    const reimbursementAttributes = selectedProduct.saving.attributes.filter(
      (attr) =>
        attr.id === "bank_entity" ||
        attr.id === "account_type" ||
        attr.id === "account_number",
    );

    if (reimbursementAttributes) {
      setReimbursementModal({
        ...reimbursementModal,
        data: reimbursementAttributes,
      });
    }
  };

  const getCommitments = async () => {
    if (!selectedProduct || !accessToken) return;

    let selectedCommitments = commitments;

    if (commitments.length === 0) {
      const newCommitments = await getSavingsCommitmentsForUser(
        user.identification,
        accessToken,
      );

      if (newCommitments) {
        selectedCommitments = newCommitments;
        setCommitments(newCommitments);
      }
    }

    const foundCommitments = selectedCommitments.filter(
      (commitment) =>
        commitment.id ===
        selectedProduct.saving.commitments?.find(
          (commitmentId) => commitmentId === commitment.id,
        ),
    );

    setCommitmentsModal({
      ...commitmentsModal,
      data: foundCommitments,
    });
  };

  const handleSortProduct = async () => {
    if (!product_id || !user || !accessToken) return;

    const { selectedSaving, newSavings, combinedSavings } =
      await validateSaving(
        savings,
        product_id,
        user.identification,
        accessToken,
      );

    setSavings(newSavings);

    if (!selectedSaving) return;

    setSelectedProduct({
      saving: selectedSaving || [],
      option: selectedSaving.id,
    });

    setProductsOptions(
      combinedSavings.map((saving) => ({
        id: saving.id,
        value: saving.id,
        label: saving.description,
      })),
    );
  };

  useEffect(() => {
    getBeneficiaries();
    getReimbursement();
    getCommitments();
  }, [selectedProduct]);

  useEffect(() => {
    handleSortProduct();
  }, [user, accessToken, product_id]);

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-savings/account/${value}`);
  };

  const handleToggleBeneficiariesModal = () => {
    setBeneficiariesModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleToggleReimbursementModal = () => {
    setReimbursementModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleToggleCommitmentsModal = () => {
    setCommitmentsModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleSubmitRecharge = (savingAccount: string, amount: number) => {
    if (!accessToken || !user.identification) return;

    setShowRechargeModal(false);
    setLoadingSend(true);

    sendTransferRequest(user, savingAccount, amount, accessToken).catch(() => {
      addFlag({
        title: "El depósito no pudo ser procesado",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        appearance: "danger",
        duration: 5000,
      });

      setLoadingSend(false);
    });
  };

  const handleToggleRechargeModal = () => {
    setShowActionsModal(false);
    setShowRechargeModal(!showRechargeModal);
  };

  const handleToggleActionsModal = () => {
    setShowActionsModal(!showActionsModal);
  };

  const handleToggleChangeQuotaModal = () => {
    setShowActionsModal(false);
    setShowChangeQuotaModal(!showChangeQuotaModal);
  };

  const handleToggleModifyActionModal = () => {
    setShowActionsModal(false);
    setShowModifyActionModal(!showModifyActionModal);
  };

  const handleToggleCancelSavingModal = () => {
    setShowActionsModal(false);
    setShowCancelSavingModal(!showCancelSavingModal);
  };

  const handleChangeQuota = (newQuota: number | "") => {
    if (!accessToken || !selectedProduct || newQuota === "") return;

    setLoadingAction(true);

    const modifyQuotaRequestData: IModifyQuotaProgrammedSavingRequest = {
      customerCode: user.identification,
      quotaValue: newQuota,
      savingNumber: selectedProduct.saving.id,
    };

    modifyQuotaProgrammedSaving(modifyQuotaRequestData, accessToken).then(
      () => {
        setShowChangeQuotaModal(false);
        setLoadingAction(false);
        setRedirectModal(true);
      },
    );
  };

  const handleModifyAction = (newActionExpiration: string) => {
    if (!accessToken || !selectedProduct) return;

    setLoadingAction(true);

    const modifyActionRequestData: IModifyActionProgrammedSavingRequest = {
      customerCode: user.identification,
      savingNumber: selectedProduct.saving.id,
      actionExpiration: newActionExpiration,
    };

    if (selectedProduct.saving.type === EProductType.PROGRAMMEDSAVINGS) {
      modifyActionProgrammedSaving(modifyActionRequestData, accessToken).then(
        () => {
          setShowModifyActionModal(false);
          setLoadingAction(false);
          setRedirectModal(true);
        },
      );
    } else if (selectedProduct.saving.type === EProductType.CDAT) {
      modifyActionCdat(modifyActionRequestData, accessToken).then(() => {
        setShowModifyActionModal(false);
        setLoadingAction(false);
        setRedirectModal(true);
      });
    }
  };

  const handleCancelSaving = () => {
    if (!accessToken || !selectedProduct) return;

    setLoadingAction(true);

    const netValue = Number(
      extractAttribute(selectedProduct.saving.attributes, "net_value")?.value ||
        0,
    );
    const disbursement = savings.savingsAccounts[0];

    if (selectedProduct.saving.type === EProductType.PROGRAMMEDSAVINGS) {
      const cancelRequestData: ICancelProgrammedSavingRequest = {
        balanceSaving: netValue,
        customerCode: user.identification,
        productName: selectedProduct.saving.title,
        productNumber: selectedProduct.saving.id,
        disbursmentMethod: {
          id: disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.id,
          name: disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.value,
          accountNumber: disbursement.id,
        },
      };

      cancelProgrammedSaving(cancelRequestData, accessToken).then(() => {
        setShowCancelSavingModal(false);
        setLoadingAction(false);
        setRedirectModal(true);
      });
    } else if (selectedProduct.saving.type === EProductType.CDAT) {
      const cancelRequestData: ICancelCdatRequest = {
        customerCode: user.identification,
        savingNumber: selectedProduct.saving.id,
        disbursmentMethod: {
          id: disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.id,
          name: disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.value,
          accountNumber: disbursement.id,
        },
      };

      cancelCdat(cancelRequestData, accessToken).then(() => {
        setShowCancelSavingModal(false);
        setLoadingAction(false);
        setRedirectModal(true);
      });
    }
  };

  const handleDownloadCertificate = () => {
    if (!selectedProduct?.saving) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(getCdatCertificateDocument(selectedProduct, user)),
      [16, 0, 16, 0],
      (pdf) => {
        pdf.save(
          `certificado-${selectedProduct.saving.id}-${formatSecondaryDate(today)}.pdf`,
        );
      },
    );
  };

  const handleShareCertificate = () => {
    if (!selectedProduct?.saving) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(getCdatCertificateDocument(selectedProduct, user)),
      [16, 0, 16, 0],
      (pdf) => {
        const pdfBlob = pdf.output("blob");

        if (navigator.share) {
          navigator.share({
            title: "Certificado",
            text: `${selectedProduct.saving.title}- ${formatSecondaryDate(today)}`,
            files: [
              new File(
                [pdfBlob],
                `certificado-${selectedProduct.saving.id}-${formatSecondaryDate(today)}.pdf`,
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
    if (!selectedProduct?.saving) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    doc.setProperties({
      title: `Extracto-${selectedProduct.saving.id}`,
      subject: "Informe",
      author: `${user.firstName} ${user.firstLastName}`,
      creator: enviroment.CLIENT_NAME,
      keywords: "PDF/A",
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(
        getSavingsAccountDocument(user, selectedProduct, commitments),
      ),
      [16, 0, 16, 0],
      (pdf) => {
        pdf.save(
          `Extracto-${selectedProduct.saving.id}-${formatSecondaryDate(today)}.pdf`,
        );
      },
    );
  };

  const handleRedirectToHome = () => {
    navigate("/");
  };

  const handleRedirectToRequests = () => {
    navigate("/my-requests?success_request=true");
  };

  if (!selectedProduct) return null;

  const withTransfers = getFlag(
    "admin.transfers.deposit.deposit-accounts",
  ).value;

  return (
    <SavingsAccountUI
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      productId={product_id}
      beneficiariesModal={beneficiariesModal}
      commitmentsModal={commitmentsModal}
      reimbursementModal={reimbursementModal}
      showRechargeModal={showRechargeModal}
      loadingSend={loadingSend}
      withTransfers={withTransfers}
      showActionsModal={showActionsModal}
      showChangeQuotaModal={showChangeQuotaModal}
      showModifyActionModal={showModifyActionModal}
      showCancelSavingModal={showCancelSavingModal}
      redirectModal={redirectModal}
      disbursementAccount={savings.savingsAccounts[0].id}
      loadingAction={loadingAction}
      onToggleBeneficiariesModal={handleToggleBeneficiariesModal}
      onChangeProduct={handleChangeProduct}
      onToggleCommitmentsModal={handleToggleCommitmentsModal}
      onToggleReimbursementModal={handleToggleReimbursementModal}
      onToggleRechargeModal={handleToggleRechargeModal}
      onSubmitRecharge={handleSubmitRecharge}
      onToggleActionsModal={handleToggleActionsModal}
      onChangeQuota={handleChangeQuota}
      onModifyAction={handleModifyAction}
      onCancelSaving={handleCancelSaving}
      onToggleChangeQuotaModal={handleToggleChangeQuotaModal}
      onToggleModifyActionModal={handleToggleModifyActionModal}
      onToggleCancelSavingModal={handleToggleCancelSavingModal}
      onDownloadCertificate={handleDownloadCertificate}
      onShareCertificate={handleShareCertificate}
      onDownloadExtract={handleDownloadExtract}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
    />
  );
}

export { SavingsAccount };
