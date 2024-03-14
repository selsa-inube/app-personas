import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledBody, StyledModal } from "./styles";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

interface HandlingFeeModalProps {
  portalId: string;
  handlingFee: IAttribute[];
  onCloseModal: () => void;
}

function formatAndFilterHandlingFeeAttributes(
  value: number | string | IAttribute[],
): IAttribute[] {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item.id === "handling_fee_value") {
        return {
          ...item,
          value: currencyFormat(Number(item.value)),
        };
      } else {
        return item;
      }
    });
  }
  return [];
}

function HandlingFeeModal(props: HandlingFeeModalProps) {
  const { portalId, handlingFee, onCloseModal } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

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
              Cuota de manejo
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
          <Text
            type="body"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            Visualiza los detalles de la cuota de manejo
          </Text>
        </Stack>

        <Divider dashed />

        <StyledBody>
          <Stack direction="column" gap="s200">
            <Stack gap="s200" direction="column">
              {formatAndFilterHandlingFeeAttributes(handlingFee).map(
                (quota) => (
                  <Stack
                    gap="s100"
                    alignItems="center"
                    width="100%"
                    key={quota.id}
                  >
                    <Stack justifyContent="space-between" width="100%">
                      <Text
                        type="label"
                        size={isMobile ? "small" : "large"}
                        appearance="dark"
                      >
                        {`${quota.label}: `}
                      </Text>
                      <Text
                        type="body"
                        size={isMobile ? "small" : "medium"}
                        appearance="gray"
                      >
                        {String(quota.value)}
                      </Text>
                    </Stack>
                  </Stack>
                ),
              )}
            </Stack>
          </Stack>
        </StyledBody>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { HandlingFeeModal };
