import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CreditsContext } from "src/context/credits";
import { IMovement } from "src/model/entity/product";
import { CreditUI } from "./interface";
import {
  ICurrentPaymentModalState,
  IExpiredPaymentModalState,
  INextPaymentModalState,
  ISelectedProductState,
} from "./types";
import {
  getCurrentPaymentData,
  getExpiredPaymentData,
  getNextPaymentData,
  validateCredit,
  validateCreditMovementsAndAmortization,
} from "./utils";

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [loading, setLoading] = useState(true);
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
  const [nextPaymentModal, setNextPaymentModal] =
    useState<INextPaymentModalState>({ show: false });
  const [expiredPaymentModal, setExpiredPaymentModal] =
    useState<IExpiredPaymentModalState>({ show: false });
  const [currentPaymentModal, setCurrentPaymentModal] =
    useState<ICurrentPaymentModalState>({ show: false });
  const [creditMovementModal, setCreditMovementModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<IMovement>();
  const { credits, setCredits } = useContext(CreditsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, user, accessToken, isMobile]);

  useEffect(() => {
    if (!selectedProduct) return;

    updatePaymentData(selectedProduct);
  }, [selectedProduct]);

  const updatePaymentData = (selectedProduct: ISelectedProductState) => {
    const nextPaymentData = getNextPaymentData(selectedProduct.credit);
    setNextPaymentModal((prevState) => ({
      ...prevState,
      data: nextPaymentData,
    }));

    const expiredPaymentData = getExpiredPaymentData(selectedProduct.credit);
    setExpiredPaymentModal((prevState) => ({
      ...prevState,
      data: expiredPaymentData,
    }));

    const currentPaymentData = getCurrentPaymentData(selectedProduct.credit);
    setCurrentPaymentModal((prevState) => ({
      ...prevState,
      data: currentPaymentData,
    }));
  };

  const handleSortProduct = async () => {
    if (!credit_id || !user || !accessToken) return;

    const { selectedCredit, newCredits } = await validateCredit(
      credits,
      credit_id,
      user.identification,
      accessToken,
    );

    setCredits(newCredits);

    if (!selectedCredit) return;

    setSelectedProduct({
      credit: selectedCredit || [],
      option: selectedCredit.id,
    });

    setProductsOptions(
      newCredits.map((credit) => ({
        id: credit.id,
        value: credit.id,
        label: credit.description,
      })),
    );

    validateCreditMovementsAndAmortization(
      selectedCredit,
      newCredits,
      accessToken,
    ).then(({ newCredits, newSelectedCredit }) => {
      setLoading(false);
      setCredits(newCredits);
      setSelectedProduct({
        option: newSelectedCredit.id,
        credit: newSelectedCredit,
      });
    });
  };

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-credits/${value}`);
  };

  const handleToggleNextPaymentModal = () => {
    setNextPaymentModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleToggleExpiredPaymentModal = () => {
    setExpiredPaymentModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleOpenModal = (movement: IMovement) => {
    setSelectedMovement(movement);
    setCreditMovementModal(true);
  };

  const handleCloseModal = () => {
    setCreditMovementModal(false);
    setSelectedMovement(undefined);
  };

  return (
    <CreditUI
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      loading={loading}
      isMobile={isMobile}
      credit_id={credit_id}
      nextPaymentModal={nextPaymentModal}
      expiredPaymentModal={expiredPaymentModal}
      creditMovementModal={creditMovementModal}
      currentPaymentModal={currentPaymentModal}
      selectedMovement={selectedMovement}
      handleToggleNextPaymentModal={handleToggleNextPaymentModal}
      handleToggleExpiredPaymentModal={handleToggleExpiredPaymentModal}
      handleChangeProduct={handleChangeProduct}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
    />
  );
}

export { Credit };
