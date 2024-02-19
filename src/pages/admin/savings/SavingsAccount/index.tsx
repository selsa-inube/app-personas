import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsContext } from "src/context/savings";
import { EProductType } from "src/model/entity/product";
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
  const { user, accessToken } = useAuth();
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

    const reimbursementAttribute = selectedProduct.saving.attributes.find(
      (attr) => attr.id === "refund_value",
    );

    if (reimbursementAttribute && Array.isArray(reimbursementAttribute.value)) {
      setReimbursementModal({
        ...beneficiariesModal,
        data: reimbursementAttribute.value,
      });
    }
  };

  const getCommitments = async () => {
    if (!selectedProduct || !accessToken) return;

    const productNumber =
      selectedProduct.option.split("-").length > 1 &&
      selectedProduct.option.split("-")[1];

    const tempDocumentNumberCodes: Record<string, number> = {
      [EProductType.PERMANENTSAVINGS]: 206,
      [EProductType.CONTRIBUTIONS]: 205,
    };

    const foundCommitments = commitments.filter(
      (commitment) =>
        productNumber &&
        commitment.savingNumber?.includes(productNumber) &&
        commitment.savingNumber?.includes(
          String(tempDocumentNumberCodes[selectedProduct.saving.type]),
        ),
    );

    setCommitmentsModal({
      ...commitmentsModal,
      data: foundCommitments,
    });
  };

  const handleSortProduct = async () => {
    if (!product_id || !user || !accessToken) return;

    const { selectedSavings, newSavings, combinedSavings } =
      await validateSaving(
        savings,
        product_id,
        user.identification,
        accessToken,
      );

    setSavings(newSavings);

    if (!selectedSavings) return;

    setSelectedProduct({
      saving: selectedSavings || [],
      option: selectedSavings.id,
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
      handleToggleBeneficiariesModal={handleToggleBeneficiariesModal}
      handleChangeProduct={handleChangeProduct}
      handleToggleCommitmentsModal={handleToggleCommitmentsModal}
      handleToggleReimbursementModal={handleToggleReimbursementModal}
    />
  );
}

export { SavingsAccount };
