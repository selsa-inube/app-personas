import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledBodyItem, StyledDivider, StyledModal } from "./styles";

interface DetailsInArrearsModalProps {
  portalId: string;
  detailsInArrearsData: {
    daysPastDue: number;
    inArrearsValue: number;
  };
  onCloseModal: () => void;
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
          appearance={value >= 0 ? "gray" : "error"}
        >
          {value}
        </Text>
      ) : (
        <Text key={index} type="body" size="medium" appearance={"gray"}>
          {value}
        </Text>
      ),
    )}
  </StyledBodyItem>
);

function DetailsInArrearsModal(props: DetailsInArrearsModalProps) {
  const { portalId, onCloseModal, detailsInArrearsData } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Detalle de mora
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
            Detalles del estado actual de la mora
          </Text>
        </Stack>

        <StyledDivider />
        <Stack direction="column" alignItems="flex-start" gap="s150">
          {renderTransactionSpecification("Dias vencidos:", [
            detailsInArrearsData.daysPastDue,
          ])}
          {renderTransactionSpecification("Valor de mora:", [
            currencyFormat(detailsInArrearsData.inArrearsValue),
          ])}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { DetailsInArrearsModal };
