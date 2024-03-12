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

interface SavingAccountsModalProps {
  portalId: string;
  savingAccounts: IAttribute[];
  onCloseModal: () => void;
}

function formatAndFilterNetValueAttributes(
  value: number | string | IAttribute[],
): IAttribute[] {
  if (Array.isArray(value)) {
    const netValueAttributes = value.filter((item) => item.id === "net_value");
    if (netValueAttributes.length > 0) {
      return netValueAttributes.map((attribute) => ({
        ...attribute,
        value: currencyFormat(Number(attribute.value)),
      }));
    }
  }
  return [];
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
            Cuentas ligadas al producto
          </Text>
        </Stack>
        <StyledDivider dashed />
        <Stack direction="column" gap="s150">
          {savingAccounts.length === 0
            ? "No se han encontrado resultados"
            : savingAccounts.map((account) => (
                <Product
                  key={account.id}
                  title={account.label}
                  description={getAccountNumber(account.value)}
                  icon={<MdOutlineAccountBalanceWallet />}
                  attributes={formatAndFilterNetValueAttributes(account.value)}
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