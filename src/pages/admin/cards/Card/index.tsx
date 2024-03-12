import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { CardUI } from "./interface";
import { cardsMock } from "@mocks/products/cards/cards.mock";
import { useNavigate, useParams } from "react-router-dom";
import {
  ICommissionsModal,
  ISavingAccountsModal,
  ISelectedProductState,
  initialSelectedProductState,
} from "./types";
import { ISelectOption } from "@design/input/Select/types";

function Card() {
  const { card_id } = useParams();
  const { cards, setCards } = useContext(CreditsContext);
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
  const [commissionsModal, setCommissionsModal] = useState<ICommissionsModal>(
    () => ({
      show: false,
      data: [],
    }),
  );

  useEffect(() => {
    if (user && accessToken && cards.length === 0) {
      setCards(cardsMock);
    }
  }, [user, accessToken, cards, setCards]);

  useEffect(() => {
    if (cards.length > 0) {
      const selectedCard = cards.find((card) => card.id === card_id);
      if (selectedCard) {
        setSelectedProduct({
          card: selectedCard,
          option: selectedCard.id,
        });
      }
    }
    setProductsOptions(
      cardsMock
        .map((card) => ({ id: card.id, value: card.description }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    );
  }, [cards, card_id]);

  useEffect(() => {
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

      const commissionsAttribute = selectedProduct.card.attributes.find(
        (attr) => attr.id === "commissions",
      );
      const commissions = Array.isArray(commissionsAttribute?.value)
        ? commissionsAttribute?.value
        : [];

      setCommissionsModal((prevState: ICommissionsModal) => ({
        ...prevState,
        data: commissions || [],
      }));
    }
  }, [selectedProduct]);

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

  const handleToggleCommissionsModal = () => {
    setCommissionsModal((prevState: ICommissionsModal) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  return (
    <CardUI
      cardId={card_id}
      selectedProduct={selectedProduct}
      productsOptions={productsOptions}
      savingAccountsModal={savingAccountsModal}
      commissionsModal={commissionsModal}
      handleChangeProduct={handleChangeProduct}
      handleToggleSavingsAccountModal={handleToggleSavingsAccountModal}
      handleToggleCommissionsModal={handleToggleCommissionsModal}
    />
  );
}

export { Card };
