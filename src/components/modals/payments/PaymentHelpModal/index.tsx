import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { StyledInputRadio } from "@design/input/RadioCard/styles";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import {
  StyledHelpOption,
  StyledModal,
  StyledOptionsContainer,
} from "./styles";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface IHelpOption {
  id: string;
  label: string;
}

const helpOptions: IHelpOption[] = [
  {
    id: EPaymentOptionType.EXPIREDVALUE,
    label: "Seleccionar valores vencidos",
  },
  {
    id: EPaymentOptionType.NEXTVALUE,
    label: "Seleccionar próximos vencimientos",
  },
  {
    id: EPaymentOptionType.TOTALVALUE,
    label: "Seleccionar pagos totales",
  },
  {
    id: EPaymentOptionType.UNSELECTALL,
    label: "Deseleccionar todo",
  },
];

interface PaymentHelpModalProps {
  currentOption?: IHelpOption;
  onCloseModal: () => void;
  onApplyOption: (option: IHelpOption) => void;
}

function PaymentHelpModal(props: PaymentHelpModalProps) {
  const { currentOption, onCloseModal, onApplyOption } = props;
  const [selectedOption, setSelectedOption] = useState<IHelpOption | undefined>(
    currentOption,
  );

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById("modals");

  const handleApplyOption = () => {
    if (!selectedOption) return;

    onApplyOption(selectedOption);
    onCloseModal();
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
              Ayudas
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
            Estas ayudas aplican sólo para las obligaciones en pantalla.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledOptionsContainer>
          {helpOptions.map((option) => (
            <StyledHelpOption
              key={option.id}
              onClick={() => setSelectedOption(option)}
            >
              <StyledInputRadio
                id={option.id}
                type="radio"
                checked={
                  (selectedOption && selectedOption.id === option.id) || false
                }
                readOnly
                value={option.id}
              />
              <Text type="label" size="large">
                {option.label}
              </Text>
            </StyledHelpOption>
          ))}
        </StyledOptionsContainer>

        <Stack width="100%" justifyContent="flex-end" gap={inube.spacing.s100}>
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
            onClick={handleApplyOption}
            disabled={!selectedOption}
          >
            Aceptar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { PaymentHelpModal };
export type { IHelpOption };
