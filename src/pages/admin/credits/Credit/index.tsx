import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";

import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CreditUI } from "./interface";
import { INextPaymentModalState, ISelectedProductState } from "./types";
import {
  getNextPaymentData,
  validateCredit,
  validateCreditMovementsAndAmortization,
} from "./utils";

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [loading, setLoading] = useState(true);
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const [nextPaymentModal, setNextPaymentModal] =
    useState<INextPaymentModalState>({
      show: false,
    });
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

    const {
      nextCapital,
      nextInterest,
      nextPastDueInterest,
      nextPenaltyInterest,
      nextLifeInsurance,
      nextOtherConcepts,
      nextCapitalization,
      nextPaymentValue,
    } = getNextPaymentData(selectedProduct.credit);

    if (!nextPaymentValue) return;

    setNextPaymentModal({
      ...nextPaymentModal,
      data: {
        nextCapital,
        nextInterest,
        nextPastDueInterest,
        nextPenaltyInterest,
        nextLifeInsurance,
        nextOtherConcepts,
        nextCapitalization,
        nextPaymentValue,
      },
    });
  }, [selectedProduct]);

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
        value: credit.description,
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

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-credits/${id}`);
  };

  const handleToggleNextPaymentModal = () => {
    setNextPaymentModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  return (
    <CreditUI
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      loading={loading}
      isMobile={isMobile}
      credit_id={credit_id}
      nextPaymentModal={nextPaymentModal}
      handleToggleNextPaymentModal={handleToggleNextPaymentModal}
      handleChangeProduct={handleChangeProduct}
    />
  );
}

export { Credit };
