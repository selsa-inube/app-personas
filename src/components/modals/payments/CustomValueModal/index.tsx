import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { StyledInputRadio } from "@design/input/RadioCard/styles";
import { TextField } from "@design/input/TextField";
import { InputState } from "@design/input/TextField/types";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  MdAttachMoney,
  MdOutlineCheckCircle,
  MdOutlineClose,
} from "react-icons/md";
import { IPaymentOption } from "src/model/entity/payment";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import {
  StyledApplyPayContainer,
  StyledApplyPayOption,
  StyledApprovedValue,
  StyledModal,
} from "./styles";
import { IApplyPayOption, getOptions } from "./utils";
import { Divider } from "@inubekit/divider";

interface CustomValueModalProps {
  portalId: string;
  value: number;
  id: string;
  nextPaymentDate?: Date;
  lineCode: string;
  halfPayment: string;
  nextPaymentValue: number;
  totalPaymentValue: number;
  expiredValue: number;
  onCloseModal: () => void;
  onChangeOtherValue: (option: IPaymentOption) => void;
  onApplyPayOption?: (applyPayOption: IApplyPayOption, value: number) => void;
}

const DECISION_ROUNDING = 500;
const DECISION_LIMIT_DAYS_NEXT_QUOTE = 5;

function CustomValueModal(props: CustomValueModalProps) {
  const {
    portalId,
    value,
    nextPaymentValue,
    totalPaymentValue,
    nextPaymentDate,
    expiredValue,
    onCloseModal,
    onChangeOtherValue,
    onApplyPayOption,
  } = props;
  const [showResponse, setShowResponse] = useState(false);
  const [inputValidation, setInputValidation] = useState<{
    state: InputState;
    errorMessage: string;
  }>({
    state: "pending",
    errorMessage: "",
  });
  const [selectedOption, setSelectedOption] = useState<IApplyPayOption>();
  const [customValue, setCustomValue] = useState(value);
  const [applyPayOptions, setApplyPayOptions] = useState<IApplyPayOption[]>([]);

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  const handleValidateValue = () => {
    const today = new Date();
    today.setUTCHours(5, 0, 0, 0);

    if (totalPaymentValue !== 0 && customValue > totalPaymentValue) {
      setInputValidation({
        state: "invalid",
        errorMessage: "(Valor superior al saldo total)",
      });

      return;
    }

    setInputValidation({ state: "pending", errorMessage: "" });

    const daysUntilNextExpiration = Math.ceil(
      ((nextPaymentDate?.getTime() ?? 0) - today.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const isRounded =
      Math.abs(customValue - nextPaymentValue) <= DECISION_ROUNDING;

    if (
      !isRounded &&
      daysUntilNextExpiration > DECISION_LIMIT_DAYS_NEXT_QUOTE &&
      ((customValue > expiredValue && customValue < nextPaymentValue) ||
        (customValue > nextPaymentValue && customValue < totalPaymentValue))
    ) {
      setApplyPayOptions(getOptions(customValue, nextPaymentValue));
      setShowResponse(true);
    } else {
      onChangeOtherValue({
        id: EPaymentOptionType.OTHERVALUE,
        label: "Abono a capital",
        value: customValue,
      });
      onCloseModal();
    }
  };

  const handleApplyPayOption = () => {
    if (!selectedOption || !onApplyPayOption) return;

    onApplyPayOption(selectedOption, customValue);
    onCloseModal();
  };

  const handleChangeCustomValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowResponse(false);
    const parsedValue = parseCurrencyString(event.target.value);
    setCustomValue(isNaN(parsedValue) ? 0 : parsedValue);
  };

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium">
              Pagar otro valor
            </Text>

            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover={true}
              size="20px"
              spacing="none"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Ingresar el valor que deseas pagar.
          </Text>
        </Stack>

        <Divider dashed />

        <Stack gap="s200" direction="column">
          <TextField
            id="customValue"
            name="customValue"
            label="Valor"
            iconAfter={
              <Icon icon={<MdAttachMoney />} appearance="dark" size="18px" />
            }
            placeholder=""
            value={customValue ? currencyFormat(customValue, false) : ""}
            onChange={handleChangeCustomValue}
            isFullWidth
            state={inputValidation.state}
            errorMessage={
              (inputValidation.errorMessage !== "" &&
                inputValidation.errorMessage) ||
              undefined
            }
          />
          <Stack width="100%" justifyContent="flex-end">
            <Button
              variant="outlined"
              spacing="compact"
              onClick={handleValidateValue}
              disabled={customValue === 0 || showResponse}
            >
              Continuar
            </Button>
          </Stack>
        </Stack>

        {showResponse && (
          <>
            <Divider dashed />

            <Stack gap="s200" direction="column">
              <StyledApprovedValue>
                <Icon appearance="success" icon={<MdOutlineCheckCircle />} />
                <Text type="label" size="large">
                  Valor aprobado
                </Text>
              </StyledApprovedValue>

              {customValue !== totalPaymentValue && (
                <>
                  <Text type="body" size="medium" appearance="gray">
                    Selecciona como quieres aplicar el pago.
                  </Text>

                  <StyledApplyPayContainer>
                    {applyPayOptions.map((option) => (
                      <StyledApplyPayOption
                        key={option.id}
                        onClick={() => setSelectedOption(option)}
                      >
                        <StyledInputRadio
                          id={option.id}
                          type="radio"
                          checked={
                            (selectedOption &&
                              selectedOption.id === option.id) ||
                            false
                          }
                          readOnly
                          value={option.id}
                        />
                        <Text type="label" size="large">
                          {option.label}
                        </Text>
                      </StyledApplyPayOption>
                    ))}
                  </StyledApplyPayContainer>
                </>
              )}

              <Stack width="100%" justifyContent="flex-end" gap="s100">
                <Button
                  appearance="gray"
                  variant="outlined"
                  spacing="compact"
                  onClick={onCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  spacing="compact"
                  onClick={handleApplyPayOption}
                  disabled={
                    !selectedOption ||
                    (totalPaymentValue !== 0 && customValue > totalPaymentValue)
                  }
                >
                  Aceptar
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CustomValueModal };
