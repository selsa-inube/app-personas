import { Icon } from "@design/data/Icon";
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { EMoneySourceType } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import { EPaymentMethodType } from "@pages/admin/payments/Pay/types";
import { MdAttachMoney } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledCardContainer, StyledInputRadio, StyledLabel } from "./styles";

interface PaymentMethodCardProps {
  moneySource: {
    id: string;
    label: string;
    value: number;
    balance: number;
    type: EMoneySourceType;
  };
  paymentMethod: string;
  valueToPay: number;
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMoneySource: (id: string) => void;
}

function PaymentMethodCard(props: PaymentMethodCardProps) {
  const {
    moneySource,
    paymentMethod,
    valueToPay,
    onChangeMoneySource,
    onSelectMoneySource,
  } = props;

  return (
    <StyledCardContainer>
      <Stack gap="s100" alignItems="center" width="100%">
        {moneySource.type === EMoneySourceType.SAVINGACCOUNT &&
          paymentMethod === EPaymentMethodType.DEBIT && (
            <StyledInputRadio
              id={`radio-${moneySource.id}`}
              type="radio"
              checked={moneySource.value !== 0}
              readOnly
              value={valueToPay}
              onClick={() => onSelectMoneySource(moneySource.id)}
              cursorPointer={
                moneySource.type === EMoneySourceType.SAVINGACCOUNT &&
                paymentMethod === EPaymentMethodType.DEBIT
              }
            />
          )}

        <Stack justifyContent="space-between" alignItems="center" width="100%">
          <Text type="label" size="large">
            {moneySource.label}
          </Text>
          {moneySource.value > moneySource.balance && (
            <Tag label="Fondos insuficientes" appearance="error" />
          )}
        </Stack>
      </Stack>

      {moneySource.type === EMoneySourceType.SAVINGACCOUNT && (
        <Stack direction="column" gap="s100">
          <StyledLabel>
            <Text type="label" size="large" appearance="gray">
              Numero de cuenta:
            </Text>
            <Text type="body" size="medium">
              {moneySource.id}
            </Text>
          </StyledLabel>
          <StyledLabel>
            <Text type="label" size="large" appearance="gray">
              Saldo de la cuenta:
            </Text>
            <Text type="body" size="medium">
              {currencyFormat(moneySource.balance)}
            </Text>
          </StyledLabel>
        </Stack>
      )}

      <TextField
        id={moneySource.id}
        name={moneySource.id}
        placeholder=""
        value={currencyFormat(moneySource.value)}
        onChange={onChangeMoneySource}
        isFullWidth
        isDisabled={paymentMethod !== EPaymentMethodType.MULTIPLE}
        size="compact"
        state={moneySource.value > moneySource.balance ? "invalid" : "pending"}
        iconAfter={
          <Icon
            icon={<MdAttachMoney />}
            appearance="dark"
            size="18px"
            spacing="none"
          />
        }
      />
    </StyledCardContainer>
  );
}

export { PaymentMethodCard };
export type { PaymentMethodCardProps };
