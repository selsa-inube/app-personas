import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsAccountUI } from "./interface";
import {
  IBeneficiariesModalState,
  ICommitmentsModalState,
  IReimbursementModalState,
  ISelectedProductState,
} from "./types";

function SavingsAccount() {
  const { product_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
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

  const getCommitments = () => {
    if (!selectedProduct) return;

    const productsCommitments = [
      ...savingsCommitmentsMock,
      ...investmentsCommitmentsMock,
    ];

    const foundCommitments = productsCommitments.filter((commitment) =>
      commitment.products.includes(selectedProduct.saving.id),
    );

    setCommitmentsModal({
      ...commitmentsModal,
      data: foundCommitments,
    });
  };

  const handleSortProduct = () => {
    const products = [...savingsMock, ...investmentsMock];
    const savingsOptions = products.map((saving) => {
      const productOption = {
        id: saving.id,
        value: saving.description,
      };

      if (saving.id === product_id) {
        setSelectedProduct({
          saving: {
            ...saving,
            movements: saving.movements?.slice(0, 5),
          },
          option: productOption.id,
        });
      }

      return productOption;
    });

    setProductsOptions(savingsOptions);
  };

  useEffect(() => {
    getBeneficiaries();
    getCommitments();
    getReimbursement();
  }, [selectedProduct]);

  useEffect(() => {
    handleSortProduct();
  }, [product_id, isMobile]);

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
      handleToggleBeneficiariesModal={handleToggleBeneficiariesModal}
      handleChangeProduct={handleChangeProduct}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      productId={product_id}
      beneficiariesModal={beneficiariesModal}
      commitmentsModal={commitmentsModal}
      reimbursementModal={reimbursementModal}
      handleToggleCommitmentsModal={handleToggleCommitmentsModal}
      handleToggleReimbursementModal={handleToggleReimbursementModal}
    />
  );
}

export { SavingsAccount };
