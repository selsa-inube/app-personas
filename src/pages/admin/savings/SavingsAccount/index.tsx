import { IAction } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { ISelectOption } from "@design/input/Select/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormat } from "src/utils/formats";
import { SavingsAccountUI } from "./interface";
import { IBeneficiariesModalState, ISelectedProductState } from "./types";

const savingTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => (
      <Text
        type="body"
        size="small"
        appearance={movement.totalValue >= 0 ? "dark" : "error"}
        cursorHover
      >
        {currencyFormat(movement.totalValue)}
      </Text>
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: () => <MdOpenInNew />,
    mobilePriority: true,
  },
];

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

  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    getBeneficiaries();
  }, [selectedProduct]);

  useEffect(() => {
    handleSortProduct();
  }, [product_id, isMobile]);

  const getBeneficiaries = () => {
    if (selectedProduct) {
      const beneficiariesAttribute = selectedProduct.saving.attributes.find(
        (attr) => attr.id === "beneficiaries"
      );

      if (
        beneficiariesAttribute &&
        Array.isArray(beneficiariesAttribute.value)
      ) {
        setBeneficiariesModal({
          ...beneficiariesModal,
          data: beneficiariesAttribute.value,
        });
      }
    }
  };

  const handleSortProduct = () => {
    const savingsOptions = savingsMock.map((saving) => {
      const productOption = {
        id: saving.id,
        value: `${saving.title} - ${saving.id}`,
      };

      if (saving.id === product_id) {
        setSelectedProduct({
          saving: {
            ...saving,
            movements: saving.movements?.slice(0, isMobile ? 5 : 10),
          },
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(savingsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-savings/account/${option.id}`);
  };

  const handleToggleModal = () => {
    setBeneficiariesModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  if (!selectedProduct) return null;

  return (
    <SavingsAccountUI
      handleToggleModal={handleToggleModal}
      handleChangeProduct={handleChangeProduct}
      savingTableActions={savingTableActions}
      productsOptions={productsOptions}
      selectedProduct={selectedProduct}
      isMobile={isMobile}
      productId={product_id}
      beneficiariesModal={beneficiariesModal}
    />
  );
}

export { SavingsAccount };
