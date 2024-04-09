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
import { MdEdit } from "react-icons/md";
import { IPaymentOption } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import {
  StyledCardContainer,
  StyledInputContainer,
  StyledInputRadio,
} from "./styles";

interface PaymentCardProps {
  id: string;
  title: string;
  options: IPaymentOption[];
  tags: TagProps[];
  allowCustomValue?: boolean;
  defaultSelectedOption?: IPaymentOption;
  onChangePaymentValue: (payId: string, valueToPay: number) => void;
  onApplyPayOption: (payId: string, option: IApplyPayOption) => void;
}

function PaymentCard(props: PaymentCardProps) {
  const {
    id,
    title,
    options,
    tags,
    allowCustomValue,
    defaultSelectedOption,
    onChangePaymentValue,
    onApplyPayOption,
  } = props;
  const [selectedOption, setSelectedOption] = useState<
    IPaymentOption | undefined
  >();

  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 580px)");

  useEffect(() => {
    if (!defaultSelectedOption) return;

    setSelectedOption(defaultSelectedOption);
  }, [defaultSelectedOption]);

  const handleChangeOption = (option: IPaymentOption) => {
    onChangePaymentValue(id, option.value);
    setSelectedOption(option);
    if (tags.length > 1) tags.pop();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleApplyPayOption = (option: IApplyPayOption, value: number) => {
    onApplyPayOption(id, option);

    if (tags.length > 1) tags.pop();

    tags.push({
      label: option.label,
      appearance: "dark",
      modifier: "clear",
      textAppearance: "dark",
    });

    onChangePaymentValue(id, value);
    setSelectedOption({
      id: "custom",
      label: "Próximo vencimiento",
      value,
    });
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
          <Stack gap="s100">
            {tags.length > 0 &&
              tags.map((tag) => <Tag {...tag} key={tag.label} />)}
          </Stack>
        </Stack>

        <Stack direction="column" gap="s100">
          {options.map((option, index) => (
            <StyledInputContainer
              key={index}
              onClick={() => handleChangeOption(option)}
            >
              <Stack gap="s150">
                <StyledInputRadio
                  id={option.id}
                  type="radio"
                  checked={
                    (defaultSelectedOption &&
                      option.id === defaultSelectedOption.id) ||
                    (selectedOption && option.id === selectedOption.id) ||
                    false
                  }
                  readOnly
                  value={option.id}
                />
                <Stack
                  direction={isMobile ? "column" : "row"}
                  gap={isMobile ? "s0" : "s150"}
                >
                  <Text type="label" size="medium">
                    {option.label}:
                  </Text>
                  {option.description && (
                    <Text type="body" size="small" appearance="gray">
                      {option.description}
                    </Text>
                  )}
                </Stack>
              </Stack>

              <Text type="body" size="small" appearance="gray">
                {currencyFormat(option.value)}
              </Text>
            </StyledInputContainer>
          ))}
        </Stack>

        <Stack
          gap="s050"
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text type="label" size="medium">
            Pagar:
          </Text>
          <Stack width="160px">
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
          </Stack>
        </Stack>
      </StyledCardContainer>

      {showModal && balanceValue && (
        <CustomValueModal
          portalId="modals"
          value={selectedOption?.value || 0}
          balanceValue={balanceValue}
          onCloseModal={handleToggleModal}
          onApplyPayOption={handleApplyPayOption}
        />
      )}
    </>
  );
}

export { PaymentCard };
export type { PaymentCardProps };
