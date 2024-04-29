import { Icon } from "@design/data/Icon";
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import React from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IPaymentHistory } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import {
  StyledContainer,
  StyledContainerItems,
  StyledItem,
  StyledModal,
  StyledResume,
} from "./styles";

const renderAttribute = (
  label: string,
  value: string | number,
  isMobile: boolean,
) => {
  let formattedLabel = label;

  const labelMappings: { [key: string]: string } = {
    productName: "Nombre del producto:",
    productNumber: "Número del producto:",
    valueToPay: "Valor del pago:",
    applyPayment: "Aplicar pago a:",
  };

  if (labelMappings[label]) {
    formattedLabel = labelMappings[label];
  }

  return (
    <StyledItem smallScreen={isMobile}>
      <Text type="label" size={isMobile ? "small" : "medium"}>
        {formattedLabel}
      </Text>
      <Text type="body" size={isMobile ? "small" : "medium"} appearance="gray">
        {typeof value === "number" ? currencyFormat(value) : value}
      </Text>
    </StyledItem>
  );
};
interface PaymentHistoryModalProps {
  paymentHistoryData: IPaymentHistory;
  onCloseModal: () => void;
}

function PaymentHistoryModal(props: PaymentHistoryModalProps) {
  const { paymentHistoryData, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById("modals");

  if (!node) return null;

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text
              type="title"
              size={isMobile ? "small" : "medium"}
              appearance="dark"
            >
              Movimientos
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={() => onCloseModal()}
              cursorHover={true}
              size="20px"
              spacing="none"
            />
          </Stack>
          <Text
            type="body"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            Detalles de la transacción
          </Text>
        </Stack>
        <Divider dashed />
        {isMobile && (
          <StyledResume>
            <Stack justifyContent="space-between">
              <Text type="label" size="small" appearance="gray">
                Total pagado:
              </Text>
              <Text type="body" size="small">
                {currencyFormat(paymentHistoryData.value)}
              </Text>
            </Stack>
            <Stack justifyContent="space-between">
              <Text type="label" size="small" appearance="gray">
                Forma de pago:
              </Text>
              <Text type="body" size="small">
                {paymentHistoryData.paymentMethod}
              </Text>
            </Stack>
          </StyledResume>
        )}
        <StyledContainer smallScreen={isMobile}>
          {!isMobile && (
            <Stack justifyContent="space-between">
              <Text type="label" size="large" appearance="dark">
                {paymentHistoryData.title}
              </Text>
              <Tag
                label={paymentHistoryData.tag.label}
                appearance={paymentHistoryData.tag.appearance}
                textAppearance={paymentHistoryData.tag.textAppearance}
                modifier={paymentHistoryData.tag.modifier}
              />
            </Stack>
          )}
          {!isMobile && <Divider dashed />}
          {!isMobile && (
            <StyledResume>
              <Stack justifyContent="space-between">
                <Text type="title" size="small" appearance="gray">
                  Total pagado:
                </Text>
                <Text type="body" size="medium">
                  {currencyFormat(paymentHistoryData.value)}
                </Text>
              </Stack>
              <Stack justifyContent="space-between">
                <Text type="title" size="small" appearance="gray">
                  Forma de pago:
                </Text>
                <Text type="body" size="medium">
                  {paymentHistoryData.paymentMethod}
                </Text>
              </Stack>
            </StyledResume>
          )}
          {isMobile && (
            <Stack direction="column" gap="s100">
              <Stack justifyContent="space-between">
                <Stack width="64%">
                  <Text type="label" size="medium" appearance="dark" ellipsis>
                    {paymentHistoryData.title}
                  </Text>
                </Stack>
                <Tag
                  label={paymentHistoryData.tag.label}
                  appearance={paymentHistoryData.tag.appearance}
                  textAppearance={paymentHistoryData.tag.textAppearance}
                  modifier={paymentHistoryData.tag.modifier}
                />
              </Stack>
              <Divider dashed />
            </Stack>
          )}
          <StyledContainerItems>
            {paymentHistoryData.products &&
              paymentHistoryData.products.map((product, index) => (
                <React.Fragment key={index}>
                  <Stack key={index} direction="column" gap="s100">
                    {Object.entries(product).map(
                      ([label, value], innerIndex) => (
                        <React.Fragment key={innerIndex}>
                          {renderAttribute(label, value, isMobile)}
                        </React.Fragment>
                      ),
                    )}
                  </Stack>
                  {index !== (paymentHistoryData.products?.length ?? 0) - 1 && (
                    <Divider key={`divider-${index}`} dashed />
                  )}
                </React.Fragment>
              ))}
          </StyledContainerItems>
        </StyledContainer>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { PaymentHistoryModal };
