import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IMovement } from "@ptypes/pages/product.types";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/formats";
import { StyledBodyItem, StyledDivider, StyledModal } from "./styles";

interface SavingMovementModalProps {
  portalId: string;
  onCloseModal: () => void;
  movement: IMovement;
}

const renderTransactionSpecification = (
  label: string,
  values: string[] | number[]
) => (
  <StyledBodyItem>
    <Text type="label" size="large" appearance="dark">
      {label}
    </Text>

    {values.map((value) =>
      typeof value === "number" ? (
        <Text
          type={value >= 0 ? "body" : "label"}
          size={value >= 0 ? "medium" : "large"}
          appearance={value >= 0 ? "gray" : "error"}
        >
          {currencyFormat(value)}
        </Text>
      ) : (
        <Text type="body" size="medium" appearance={"gray"}>
          {value}
        </Text>
      )
    )}
  </StyledBodyItem>
);

function SavingMovementModal(props: SavingMovementModalProps) {
  const { portalId, onCloseModal, movement } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const buildSecondDescription = () => {
    const sequence = movement.sequence ? `Sec:${movement.sequence}` : "";
    const cardNumber = movement.cardNumber
      ? `Tarjeta:${movement.cardNumber}`
      : "";

    return `${sequence} ${cardNumber}`;
  };

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Movimiento
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
            Detalles de la transacción
          </Text>
        </Stack>

        <StyledDivider />
        <Stack direction="column" alignItems="flex-start" gap="s075">
          {renderTransactionSpecification("Valor", [movement.totalValue])}
          {renderTransactionSpecification("Fecha", [movement.date])}
          {renderTransactionSpecification("Descripción", [
            movement.description,
            buildSecondDescription(),
          ])}
          {renderTransactionSpecification("Referencia", [movement.reference])}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { SavingMovementModal };
