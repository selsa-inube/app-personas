import {
  CustomValueModal,
  IApplyPayOption,
} from "@components/modals/payments/CustomValueModal";
import { Icon } from "@design/data/Icon";
import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { IPaymentOption } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import {
  StyledCardContainer,
  StyledInputContainer,
  StyledInputRadio,
} from "./styles";

const renderOptions = (
  options: IPaymentOption[],
  isMobile: boolean,
  onChangeOption: (option: IPaymentOption) => void,
  selectedOption?: IPaymentOption,
) => {
  return options.map((option, index) => {
    const valueIsZero = option.value === 0;

    return (
      <StyledInputContainer
        key={index}
        onClick={() => !valueIsZero && onChangeOption(option)}
      >
        <Stack gap="s150">
          <StyledInputRadio
            id={option.id}
            type="radio"
            checked={
              (selectedOption && option.id === selectedOption.id) || false
            }
            readOnly
            value={option.id}
            disabled={valueIsZero}
          />
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "s0" : "s150"}
          >
            <Text type="label" size="medium" disabled={valueIsZero}>
              {option.label}:
            </Text>
            {option.description && (
              <Text
                type="body"
                size="small"
                appearance="gray"
                disabled={valueIsZero}
              >
                {option.description}
              </Text>
            )}
          </Stack>
        </Stack>

        <Text type="body" size="small" appearance="gray" disabled={valueIsZero}>
          {currencyFormat(option.value)}
        </Text>
      </StyledInputContainer>
    );
  });
};

interface PaymentCardProps {
  id: string;
  title: string;
  options: IPaymentOption[];
  tags: TagProps[];
  allowCustomValue?: boolean;
  defaultSelectedOption?: IPaymentOption;
  valueToPay?: number;
  onApplyPayOption: (
    payId: string,
    option: IPaymentOption,
    applyPayOption?: IApplyPayOption,
  ) => void;
  onChangePaymentValue: (payId: string, option: IPaymentOption) => void;
  onRemovePayment: (paymentId: string) => void;
}

function PaymentCard(props: PaymentCardProps) {
  const {
    id,
    title,
    options,
    tags,
    allowCustomValue,
    defaultSelectedOption,
    valueToPay,
    onChangePaymentValue,
    onApplyPayOption,
    onRemovePayment,
  } = props;
  const [selectedOption, setSelectedOption] = useState<
    IPaymentOption | undefined
  >();

  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 580px)");

  useEffect(() => {
    setSelectedOption(defaultSelectedOption);
  }, [defaultSelectedOption, valueToPay]);

  const handleChangeOption = (option: IPaymentOption) => {
    onChangePaymentValue(id, option);
    setSelectedOption(option);

    if (tags.find((tag) => tag.id === "payOption")) {
      const indexPayOption = tags.findIndex((tag) => tag.id === "payOption");
      tags.splice(indexPayOption, 1);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const resetValues = () => {
    setSelectedOption(undefined);
    onRemovePayment(id);

    if (tags.find((tag) => tag.id === "payOption")) {
      const indexPayOption = tags.findIndex((tag) => tag.id === "payOption");
      tags.splice(indexPayOption, 1);
    }
  };

  const handleApplyPayOption = (
    applyPayOption: IApplyPayOption,
    value: number,
  ) => {
    const customOption = {
      id: "customValue",
      label: "Valor personalizado",
      value,
    };

    onApplyPayOption(id, customOption, applyPayOption);

    if (tags.find((tag) => tag.id === "payOption")) {
      const indexPayOption = tags.findIndex((tag) => tag.id === "payOption");
      tags.splice(indexPayOption, 1);
    }

    tags.push({
      id: "payOption",
      label: applyPayOption.label,
      appearance: "dark",
      modifier: "clear",
      textAppearance: "dark",
    });

    setSelectedOption(customOption);
  };

  const balanceValue = options.find(
    (option) => option.id === "totalValue",
  )?.value;

  return (
    <>
      <StyledCardContainer>
        <Stack direction="column" gap="s100">
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
          >
            <Text type="label" size="large">
              {title}
            </Text>
            <Text type="body" size="medium" appearance="gray">
              {id}
            </Text>
          </Stack>
          <Stack gap="s100" wrap="wrap">
            {tags.length > 0 &&
              tags.map((tag) => <Tag {...tag} key={tag.label} />)}
          </Stack>
        </Stack>

        <Stack direction="column" gap="s100">
          {renderOptions(options, isMobile, handleChangeOption, selectedOption)}
        </Stack>

        <Stack
          gap="s100"
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text type="label" size="medium">
            Pagar:
          </Text>
          <Stack width="180px" alignItems="center" justifyContent="flex-end">
            <TextField
              id="customValue"
              name="customValue"
              placeholder=""
              onFocus={allowCustomValue ? handleToggleModal : undefined}
              value={currencyFormat(selectedOption?.value || 0)}
              isFullWidth
              size="compact"
              iconAfter={
                allowCustomValue ? (
                  <Icon
                    icon={<MdEdit />}
                    appearance="dark"
                    size="16px"
                    onClick={handleToggleModal}
                    cursorHover
                  />
                ) : undefined
              }
            />
            <Icon
              icon={<MdOutlineDelete />}
              appearance="error"
              size="20px"
              onClick={resetValues}
              disabled={(selectedOption?.value || 0) === 0}
              cursorHover
            />
          </Stack>
        </Stack>
      </StyledCardContainer>

      {showModal && balanceValue && (
        <CustomValueModal
          portalId="modals"
          value={selectedOption?.value || 0}
          nextPaymentValue={
            options.find((option) => option.id === "nextValue")?.value || 0
          }
          totalPaymentValue={
            options.find((option) => option.id === "totalValue")?.value || 0
          }
          onCloseModal={handleToggleModal}
          onApplyPayOption={handleApplyPayOption}
          onChangeOtherValue={handleChangeOption}
        />
      )}
    </>
  );
}

export { PaymentCard };
export type { PaymentCardProps };
