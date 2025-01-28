import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { SavingsContext } from "src/context/savings";
import { extractAttribute } from "src/utils/products";
import { IUsedQuotaModalState } from "../CreditQuota/types";
import { infoModalData } from "./config/modals";
import { CardUI } from "./interface";
import {
  IHandlingFeeModal,
  IMovementsInfoModal,
  ISavingAccountsModal,
  ISelectedProductState,
  initialSelectedProductState,
} from "./types";
import {
  getUsedQuotaData,
  validateCard,
  validateCreditQuotasInCards,
} from "./utils";

function Card() {
  const { card_id } = useParams();
  const { cards, setCards, creditQuotas, setCreditQuotas } =
    useContext(CardsContext);
  const { savings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [loadingCards, setLoadingCards] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ISelectedProductState>(
    initialSelectedProductState,
  );
  const [productsOptions, setProductsOptions] = useState<IOption[]>([]);
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
    setLoadingCards(true);

    const { selectedCard, newCards } = await validateCard(
      cards,
      card_id,
      user.identification,
      accessToken,
      savings.savingsAccounts,
    );

    if (!selectedCard) {
      setLoadingCards(false);
      return;
    }

    if (newCards.length === 0) {
      setLoadingCards(false);
      return;
    }

    setCards(newCards);

    const cardNumber =
      extractAttribute(selectedCard.attributes, "card_number")?.value || "";

    const { newCreditQuotas } = await validateCreditQuotasInCards(
      creditQuotas,
      cardNumber.toString(),
      accessToken,
    );

    const isCardQuotaValid = newCreditQuotas.every((creditQuota) =>
      newCards.some(
        (card) =>
          card.quotaDetails &&
          card.quotaDetails.some(
            (quotaDetail) => quotaDetail === creditQuota.id,
          ),
      ),
    );

    if (!isCardQuotaValid) {
      setLoadingCards(false);
      return;
    }

    setCreditQuotas(newCreditQuotas);

    setSelectedProduct({
      card: selectedCard || [],
      option: selectedCard.id,
    });

    setProductsOptions(
      newCards.map((card) => ({
        id: card.id,
        value: card.id,
        label: card.description,
      })),
    );
    setLoadingCards(false);
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

  const handleChangeProduct = (name: string, value: string) => {
    navigate(`/my-cards/${value}`);
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
      loadingCards={loadingCards}
      handleChangeProduct={handleChangeProduct}
      handleShowMovementsInfoModal={handleShowMovementsInfoModal}
      handleToggleSavingsAccountModal={handleToggleSavingsAccountModal}
      handleToggleHandlingFeeModal={handleToggleHandlingFeeModal}
      handleToggleUsedQuotaModal={handleUsedQuotaModal}
    />
  );
}

export { Card };
