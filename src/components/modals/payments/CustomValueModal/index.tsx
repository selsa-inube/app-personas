import { StyledInputRadio } from "@design/input/RadioCard/styles";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Divider,
  Icon,
  Message,
  Moneyfield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IPaymentOption } from "src/model/entity/payment";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import {
  StyledApplyPayContainer,
  StyledApplyPayOption,
  StyledModal,
} from "./styles";
import { IApplyPayOption, getOptions } from "./utils";

interface CustomValueModalProps {
  portalId: string;
  value: number;
  id: string;
  nextPaymentDate?: Date;
  lineCode: string;
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
    state: "invalid" | "pending" | undefined;
    message: string;
  }>({ state: "pending", message: "" });
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
        message: "(Valor superior al saldo total)",
      });

      return;
    }

    setInputValidation({ state: "pending", message: "" });

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
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
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
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Ingresar el valor que deseas pagar.
          </Text>
        </Stack>

        <Divider dashed />

        <Stack gap={inube.spacing.s200} direction="column">
          <Moneyfield
            id="customValue"
            name="customValue"
            label="Valor"
            placeholder=""
            value={customValue ? currencyFormat(customValue, false) : ""}
            onChange={handleChangeCustomValue}
            fullwidth
            status={inputValidation.state}
            message={
              (inputValidation.message !== "" && inputValidation.message) ||
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

            <Stack gap={inube.spacing.s200} direction="column">
              <Message title="Valor aprobado" appearance="success" fullwidth />

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

              <Stack
                width="100%"
                justifyContent="flex-end"
                gap={inube.spacing.s100}
              >
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
