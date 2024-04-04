import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useState } from "react";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import {
  StyledCardContainer,
  StyledInputContainer,
  StyledInputRadio,
} from "./styles";

interface IPaymentOption {
  id: string;
  label: string;
  description?: string;
  value: number;
}

interface PaymentCardProps {
  id: string;
  title: string;
  description: string;
  options: IPaymentOption[];
  tags: TagProps[];
  onChangePaymentValue: (cardId: string, valueToPay: number) => void;
}

function PaymentCard(props: PaymentCardProps) {
  const { id, title, description, options, tags, onChangePaymentValue } = props;

  const [selectedOption, setSelectedOption] = useState<IPaymentOption>();

  const handleChangeOption = (option: IPaymentOption) => {
    onChangePaymentValue(id, option.value);
    setSelectedOption(option);
  };

  const handleChangeCustomValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);

    onChangePaymentValue(id, parsedValue);
    setSelectedOption({
      id: "custom",
      label: "Personalizado",
      value: isNaN(parsedValue) ? 0 : parsedValue,
    });
  };

  return (
    <StyledCardContainer>
      <Stack direction="column" gap="s100">
        <Stack gap="s100">
          <Text type="label" size="large">
            {title}
          </Text>
          <Text type="body" size="medium" appearance="gray">
            {description}
          </Text>
        </Stack>
        <Stack gap="s050">
          {tags.length > 0 &&
            tags.map((tag) => <Tag {...tag} key={tag.label} />)}
        </Stack>
      </Stack>

      <Grid templateColumns="1fr 1fr" gap="s100">
        {options.map((option, index) => (
          <StyledInputContainer
            key={index}
            onClick={() => handleChangeOption(option)}
          >
            <Stack gap="s150">
              <StyledInputRadio
                id={id}
                type="radio"
                value={id}
                checked={selectedOption && option.id === selectedOption.id}
                readOnly
              />
              <Text type="label" size="medium">
                {option.label}:
              </Text>
              {option.description && (
                <Text type="body" size="small" appearance="gray">
                  {option.description}
                </Text>
              )}
            </Stack>

            <Text type="body" size="small" appearance="gray">
              {currencyFormat(option.value)}
            </Text>
          </StyledInputContainer>
        ))}
      </Grid>

      <Stack
        gap="s050"
        width="100%"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text type="label" size="medium">
          Pagar:
        </Text>
        <Stack width="120px">
          <TextField
            id="customValue"
            name="customValue"
            placeholder=""
            value={currencyFormat(selectedOption?.value || 0)}
            onChange={handleChangeCustomValue}
            isFullWidth
          />
        </Stack>
      </Stack>
    </StyledCardContainer>
  );
}

export { PaymentCard };
export type { PaymentCardProps };
