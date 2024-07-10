import { Product } from "@components/cards/Product";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineAccountBalanceWallet, MdOutlineClose } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";

interface SavingAccountsModalProps {
  portalId: string;
  savingAccounts: IAttribute[];
  onCloseModal: () => void;
}

function SavingAccountsModal(props: SavingAccountsModalProps) {
  const { portalId, savingAccounts, onCloseModal } = props;

  const getAccountNumber = (value: number | string | IAttribute[]): string => {
    if (Array.isArray(value)) {
      const accountNumberAttribute = value.find(
        (item) => item.id === "account_number",
      );
      if (
        accountNumberAttribute &&
        typeof accountNumberAttribute.value === "string"
      ) {
        return accountNumberAttribute.value;
      }
    }
    return "";
  };

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
            <Text type="title" size="medium" appearance="dark">
              Cuentas de ahorro
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
            Visualiza las cuentas ligadas a este producto
          </Text>
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap="s150">
          {savingAccounts.length === 0
            ? "No se han encontrado resultados"
            : savingAccounts.map((account) => (
                <Product
                  key={account.id}
                  title={account.label}
                  description={getAccountNumber(account.value)}
                  icon={<MdOutlineAccountBalanceWallet />}
                  navigateTo={`/my-savings/account/${getAccountNumber(account.value)}`}
                />
              ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { SavingAccountsModal };
