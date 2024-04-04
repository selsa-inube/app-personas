import { ISelectOption } from "@design/input/Select/types";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsContext } from "src/context/savings";
import { infoModalData } from "./config/modals";
import { CardUI } from "./interface";
import {
  IHandlingFeeModal,
  IMovementsInfoModal,
  ISavingAccountsModal,
  ISelectedProductState,
  initialSelectedProductState,
} from "./types";
import { validateCard, validateCreditQuotasInCards } from "./utils";
import { IUsedQuotaModalState } from "../CreditQuota/types";
import { getUsedQuotaData } from "./utils";
import { CardsContext } from "src/context/cards";

function Card() {
  const { card_id } = useParams();
  const { cards, setCards, creditQuotas, setCreditQuotas } =
    useContext(CardsContext);
  const { savings } = useContext(SavingsContext);
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ISelectedProductState>(
    initialSelectedProductState,
  );
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const [savingAccountsModal, setSavingAccountsModal] =
    useState<ISavingAccountsModal>(() => ({
      show: false,
      data: [],
    }));
  const [handlingFeeModal, setHandlingFeeModal] = useState<IHandlingFeeModal>({
    show: false,
    data: [],
  });
  const [showMovementsInfoModal, setShowMovementsInfoModal] =
    useState<IMovementsInfoModal>({
      show: false,
      data: infoModalData,
    });
  const [usedQuotaModal, setUsedQuotaModal] = useState<IUsedQuotaModalState>({
    show: false,
  });

  useEffect(() => {
    handleSortProduct();
  }, [card_id, user, accessToken]);

  useEffect(() => {
    updateModals();
  }, [selectedProduct]);

  const handleSortProduct = async () => {
    if (!card_id || !user || !accessToken) return;

    const { selectedCard, newCards } = await validateCard(
      cards,
      card_id,
      user.identification,
      accessToken,
      savings.savingsAccounts,
    );

    setCards(newCards);
    
    const { newCreditQuotas } = await validateCreditQuotasInCards(
      creditQuotas,
      card_id,
      accessToken,
    );

    setCreditQuotas(newCreditQuotas);

    if (!selectedCard) return;

    setSelectedProduct({
      card: selectedCard || [],
      option: selectedCard.id,
    });

    setProductsOptions(
      newCards.map((card) => ({
        id: card.id,
        value: card.description,
      })),
    );   
  };

  const updateModals = () => {
    if (selectedProduct && selectedProduct.card) {
      const savingsAccountsAttribute = selectedProduct.card.attributes.find(
        (attr) => attr.id === "savings_accounts",
      );
      const savingsAccounts = Array.isArray(savingsAccountsAttribute?.value)
        ? savingsAccountsAttribute?.value
        : [];

      setSavingAccountsModal((prevState: ISavingAccountsModal) => ({
        ...prevState,
        data: savingsAccounts || [],
      }));

      const handlingFeeAttribute = selectedProduct.card.attributes.find(
        (attr) => attr.id === "handling_fee",
      );
      const handlingFee = Array.isArray(handlingFeeAttribute?.value)
        ? handlingFeeAttribute?.value
        : [];

      setHandlingFeeModal((prevState: IHandlingFeeModal) => ({
        ...prevState,
        data: handlingFee || [],
      }));

      const {
        currentConsumption,
        accumulatedDebt,
        transactionsProcess,
        usedQuotaValue,
      } = getUsedQuotaData(creditQuotas);

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
    navigate(`/my-cards/${id}`);
  };

  const handleToggleSavingsAccountModal = () => {
    setSavingAccountsModal((prevState: ISavingAccountsModal) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleToggleHandlingFeeModal = () => {
    setHandlingFeeModal((prevState: IHandlingFeeModal) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  function handleShowMovementsInfoModal() {
    setShowMovementsInfoModal((prevState: IMovementsInfoModal) => ({
      ...prevState,
      show: !prevState.show,
    }));
  }

  const handleUsedQuotaModal = () => {
    setUsedQuotaModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  return (
    <CardUI
      cardId={card_id}
      creditQuotas={creditQuotas}
      showMovementsInfoModal={showMovementsInfoModal}
      selectedProduct={selectedProduct}
      productsOptions={productsOptions}
      savingAccountsModal={savingAccountsModal}
      usedQuotaModal={usedQuotaModal}
      handlingFeeModal={handlingFeeModal}
      handleChangeProduct={handleChangeProduct}
      handleShowMovementsInfoModal={handleShowMovementsInfoModal}
      handleToggleSavingsAccountModal={handleToggleSavingsAccountModal}
      handleToggleHandlingFeeModal={handleToggleHandlingFeeModal}
      handleToggleUsedQuotaModal={handleUsedQuotaModal}
    />
  );
}

export { Card };
