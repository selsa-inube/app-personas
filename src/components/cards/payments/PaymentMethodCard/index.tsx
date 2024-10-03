import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import { EMoneySourceType } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import { useState } from "react";
import { MdAttachMoney, MdOutlineDelete, MdOutlineSave } from "react-icons/md";
import { EPaymentMethodType } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import { StyledCardContainer, StyledInputRadio, StyledLabel } from "./styles";

interface PaymentMethodCardProps {
  moneySource: {
    id: string;
    label: string;
    value?: number;
    balance: number;
    type: EMoneySourceType;
  };
  paymentMethod: string;
  valueToPay: number;
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMoneySource: (id: string) => void;
  onSaveMoneySource: () => void;
  onRemoveValueMoneySource: (id: string) => void;
}

function PaymentMethodCard(props: PaymentMethodCardProps) {
  const {
    moneySource,
    paymentMethod,
    valueToPay,
    onChangeMoneySource,
    onSelectMoneySource,
    onSaveMoneySource,
    onRemoveValueMoneySource,
  } = props;

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSaveMoneySource();
  };

  const handleRemove = () => {
    setIsSaved(false);

    onRemoveValueMoneySource(moneySource.id);
  };

  return (
    <StyledCardContainer>
      <Stack gap={inube.spacing.s100} alignItems="flex-start" width="100%">
        {moneySource.type === EMoneySourceType.SAVINGACCOUNT &&
          paymentMethod === EPaymentMethodType.DEBIT && (
            <Stack padding="3px 0 0 0">
              <StyledInputRadio
                id={`radio-${moneySource.id}`}
                type="radio"
                checked={moneySource.value !== 0}
                readOnly
                value={valueToPay}
                onClick={() => onSelectMoneySource(moneySource.id)}
                $cursorPointer={
                  moneySource.type === EMoneySourceType.SAVINGACCOUNT &&
                  paymentMethod === EPaymentMethodType.DEBIT
                }
              />
            </Stack>
          )}

        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          wrap="wrap"
        >
          <Text type="label" size="large" weight="bold">
            {moneySource.label}
          </Text>

          {(moneySource.value ?? 0) > moneySource.balance && (
            <Tag
              label="Fondos insuficientes"
              appearance="danger"
              weight="strong"
            />
          )}
        </Stack>
      </Stack>

      {moneySource.type === EMoneySourceType.SAVINGACCOUNT && (
        <Stack direction="column" gap={inube.spacing.s100}>
          <StyledLabel>
            <Text type="label" size="medium" appearance="gray" weight="bold">
              Numero de cuenta:
            </Text>
            <Text type="body" size="medium">
              {moneySource.id}
            </Text>
          </StyledLabel>
          <StyledLabel>
            <Text type="label" size="medium" appearance="gray" weight="bold">
              Saldo de la cuenta:
            </Text>
            <Text type="body" size="medium">
              {currencyFormat(moneySource.balance)}
            </Text>
          </StyledLabel>
        </Stack>
      )}

      <Stack
        direction="column"
        justifyContent="flex-end"
        gap={inube.spacing.s200}
        height="100%"
      >
        <TextField
          id={moneySource.id}
          name={moneySource.id}
          placeholder=""
          value={
            moneySource.value ? currencyFormat(moneySource.value, false) : ""
          }
          onChange={onChangeMoneySource}
          isFullWidth
          isDisabled={isSaved || paymentMethod !== EPaymentMethodType.MULTIPLE}
          size="compact"
          state={
            moneySource?.value && moneySource.value > moneySource.balance
              ? "invalid"
              : "pending"
          }
          iconAfter={
            <Icon
              icon={<MdAttachMoney />}
              appearance="dark"
              size="18px"
              spacing="narrow"
            />
          }
        />

        {paymentMethod === EPaymentMethodType.MULTIPLE && (
          <Stack
            gap={inube.spacing.s150}
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              onClick={handleRemove}
              variant="outlined"
              disabled={!isSaved}
              appearance="danger"
              spacing="compact"
              iconBefore={<MdOutlineDelete />}
            >
              Eliminar
            </Button>
            <Button
              onClick={handleSave}
              variant="outlined"
              disabled={
                isSaved ||
                moneySource.value === 0 ||
                (moneySource.value ?? 0) > moneySource.balance
              }
              appearance="primary"
              spacing="compact"
              iconBefore={<MdOutlineSave />}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </StyledCardContainer>
  );
}

export { PaymentMethodCard };
export type { PaymentMethodCardProps };
