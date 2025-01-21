import { IEntry } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Divider, Icon, Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBodyItem, StyledModal } from "./styles";

interface SavingMovementModalProps {
  portalId: string;
  onCloseModal: () => void;
  movement: IEntry;
}

const renderTransactionSpecification = (
  label: string,
  values: string[] | number[],
) => (
  <StyledBodyItem>
    <Text type="label" size="large" appearance="dark">
      {label}
    </Text>

    {values.map((value, index) =>
      typeof value === "number" ? (
        <Text
          key={index}
          type={value >= 0 ? "body" : "label"}
          size={value >= 0 ? "medium" : "large"}
          appearance={value >= 0 ? "gray" : "danger"}
        >
          {currencyFormat(value)}
        </Text>
      ) : (
        <Text key={index} type="body" size="medium" appearance={"gray"}>
          {value}
        </Text>
      ),
    )}
  </StyledBodyItem>
);

function SavingMovementModal(props: SavingMovementModalProps) {
  const { portalId, onCloseModal, movement } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
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
      <StyledModal $smallScreen={isMobile}>
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
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Detalles de la transacción
          </Text>
        </Stack>

        <Divider dashed />
        <Stack
          direction="column"
          alignItems="flex-start"
          gap={inube.spacing.s075}
        >
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
    node,
  );
}

export { SavingMovementModal };
