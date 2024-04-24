import React from "react"
import { createPortal } from "react-dom";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@design/layout/Blanket";
import {
  StyledItem,
  StyledContainer,
  StyledModal,
  StyledResume,
  StyledContainerItems,
} from "./styles";
import { Icon } from "@design/data/Icon";
import { MdOutlineClose } from "react-icons/md";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Divider } from "@design/layout/Divider";
import { Tag } from "@design/data/Tag";
import { currencyFormat } from "src/utils/currency";
import { IPaymentHistory } from "src/model/entity/payment";

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
            <Stack gap="s050">
              <Text type="label" size="small" appearance="gray">
                Forma de pago:
              </Text>
              <Text type="body" size="small">
                {paymentHistoryData.paymentType}
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
                  {paymentHistoryData.paymentType}
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
                    {Object.values(product).map((item, itemIndex) => (
                      <StyledItem key={itemIndex} smallScreen={isMobile}>
                        <Text type="label" size={isMobile ? "small" : "medium"}>
                          {item.label}
                        </Text>
                        <Text
                          type="body"
                          size={isMobile ? "small" : "medium"}
                          appearance="gray"
                        >
                          {typeof item.value === "number"
                            ? currencyFormat(item.value)
                            : item.value}
                        </Text>
                      </StyledItem>
                    ))}
                  </Stack>
                  {index !== (paymentHistoryData.products?.length ?? 0) - 1 && (
                    <Divider dashed />
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
