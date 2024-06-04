import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { sendTransferRequest } from "@pages/admin/transfers/TransferOptions/utils";
import { IMessage } from "@ptypes/messages.types";
import { useContext, useEffect, useState } from "react";
import { MdSentimentNeutral } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { initialMessageState } from "src/utils/messages";
import { SavingsAccountUI } from "./interface";
import {
  IBeneficiariesModalState,
  ICommitmentsModalState,
  IReimbursementModalState,
  ISelectedProductState,
} from "./types";
import { validateSaving } from "./utils";

function SavingsAccount() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { savings, commitments, setSavings } = useContext(SavingsContext);
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
  const [loadingSend, setLoadingSend] = useState(false);
  const [message, setMessage] = useState<IMessage>(initialMessageState);

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

    const foundCommitments = commitments.filter(
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
        value: saving.description,
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

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-savings/account/${id}`);
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

  const handleSubmitRecharge = (savingAccount: string, value: number) => {
    if (!accessToken) return;

    setShowRechargeModal(false);
    setLoadingSend(true);

    sendTransferRequest(user, savingAccount, value, accessToken).catch(() => {
      setMessage({
        show: true,
        title: "La recarga no pudo ser procesada",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        icon: <MdSentimentNeutral />,
        appearance: "error",
      });

      setLoadingSend(false);
    });
  };

  const handleToggleRechargeModal = () => {
    setShowRechargeModal(!showRechargeModal);
  };

  const handleCloseMessage = () => {
    setMessage(initialMessageState);
  };

  if (!selectedProduct) return null;

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
      message={message}
      onToggleBeneficiariesModal={handleToggleBeneficiariesModal}
      onChangeProduct={handleChangeProduct}
      onToggleCommitmentsModal={handleToggleCommitmentsModal}
      onToggleReimbursementModal={handleToggleReimbursementModal}
      onToggleRechargeModal={handleToggleRechargeModal}
      onCloseMessage={handleCloseMessage}
      onSubmitRecharge={handleSubmitRecharge}
    />
  );
}

export { SavingsAccount };
