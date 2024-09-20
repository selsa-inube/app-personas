import { CustomValueModal } from "@components/modals/payments/CustomValueModal";
import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { ITag, Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
import { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
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
    if (option.hidden) return null;

    const valueIsZero = option.value === 0;

    return (
      <StyledInputContainer
        key={index}
        onClick={() => !valueIsZero && onChangeOption(option)}
        $disabled={valueIsZero}
      >
        <Stack gap={inube.spacing.s150}>
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
          <Stack direction="column" gap={inube.spacing.s0}>
            <Text
              type="label"
              size="medium"
              disabled={valueIsZero}
              weight="bold"
            >
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
  tags: ITag[];
  allowCustomValue?: boolean;
  selectedOption?: IPaymentOption;
  lineCode: string;
  onApplyPayOption: (
    payId: string,
    option: IPaymentOption,
    applyPayOption: IApplyPayOption,
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
    selectedOption,
    lineCode,
    onChangePaymentValue,
    onApplyPayOption,
    onRemovePayment,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const isMobile = useMediaQuery("(max-width: 750px)");

  const handleChangeOption = (option: IPaymentOption) => {
    onChangePaymentValue(id, option);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const resetValues = () => {
    onRemovePayment(id);
  };

  const handleApplyPayOption = (
    applyPayOption: IApplyPayOption,
    value: number,
  ) => {
    const customOption = {
      id: EPaymentOptionType.OTHERVALUE,
      label: `Otro valor / ${applyPayOption.label}`,
      value,
    };

    onApplyPayOption(id, customOption, applyPayOption);
  };

  const hastOtherValue = options.find(
    (option) => option.id === EPaymentOptionType.OTHERVALUE,
  );

  const nextPaymentValue = options.find(
    (option) => option.id === EPaymentOptionType.NEXTVALUE,
  )?.value;

  const nextPaymentDate = options.find(
    (option) => option.id === EPaymentOptionType.NEXTVALUE,
  )?.date;

  const totalPaymentValue =
    options.find((option) => option.id === EPaymentOptionType.TOTALVALUE)
      ?.value || nextPaymentValue;

  const expiredValue = options.find(
    (option) => option.id === EPaymentOptionType.EXPIREDVALUE,
  )?.value;

  return (
    <>
      <StyledCardContainer>
        <Stack direction="column" gap={inube.spacing.s050}>
          <Text type="label" size="large" ellipsis weight="bold">
            {title}
          </Text>
          <Text type="body" size="medium" appearance="gray">
            {id}
          </Text>
          <Stack gap={inube.spacing.s100} wrap="wrap">
            {tags.length > 0 &&
              tags.map((tag) => <Tag {...tag} key={tag.label} />)}
          </Stack>
        </Stack>

        <Stack direction="column" gap={inube.spacing.s100}>
          {renderOptions(options, isMobile, handleChangeOption, selectedOption)}
        </Stack>

        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Button
            onClick={resetValues}
            variant="outlined"
            disabled={(selectedOption?.value || 0) === 0}
            appearance="danger"
            spacing="compact"
            iconBefore={<MdOutlineDelete />}
          >
            Eliminar
          </Button>

          <Stack gap={inube.spacing.s100} alignItems="center">
            {allowCustomValue && hastOtherValue && (
              <Icon
                icon={<MdOutlineEdit />}
                appearance="primary"
                size="16px"
                onClick={handleToggleModal}
                cursorHover
              />
            )}

            <Text type="title" size="medium">
              {currencyFormat(selectedOption?.value || 0)}
            </Text>
          </Stack>
        </Stack>
      </StyledCardContainer>

      {showModal && (
        <CustomValueModal
          portalId="modals"
          id={id}
          nextPaymentDate={nextPaymentDate}
          lineCode={lineCode}
          value={selectedOption?.value || 0}
          nextPaymentValue={nextPaymentValue || 0}
          totalPaymentValue={totalPaymentValue || 0}
          expiredValue={expiredValue || 0}
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
