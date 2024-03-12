import { Blanket } from "@design/layout/Blanket";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { StyledDivider, StyledModal } from "./styles";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Icon } from "@design/data/Icon";
import { MdOutlineAccountBalanceWallet, MdOutlineClose } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { Product } from "@components/cards/Product";
import { currencyFormat } from "src/utils/currency";

interface CommissionsModalProps {
  portalId: string;
  commissions: IAttribute[];
  onCloseModal: () => void;
}

function formatAndFilterNetValueAttributes(
  attributes: IAttribute[],
): IAttribute[] {
  return attributes
    .filter((attribute) => attribute.id === "net_value_commission")
    .map((attribute) => ({
      ...attribute,
      value: currencyFormat(Number(attribute.value)),
    }));
}

function CommissionsModal(props: CommissionsModalProps) {
  const { portalId, commissions, onCloseModal } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const accountCommission = commissions.find(
    (commission) => commission.id === "account_number_commission",
  );

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Comisiones
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
            Visualiza de donde se debitaran las comisiones
          </Text>
        </Stack>
        <StyledDivider dashed />
        <Stack direction="column" gap="s150">
          {accountCommission && (
            <Product
              key={accountCommission.id}
              title={accountCommission.label}
              description={String(accountCommission.value)}
              icon={<MdOutlineAccountBalanceWallet />}
              attributes={formatAndFilterNetValueAttributes(commissions)}
              navigateTo={`/my-savings/account/${accountCommission.value}`}
            />
          )}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { CommissionsModal };
