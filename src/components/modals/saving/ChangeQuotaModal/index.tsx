import { InfoCard } from "@components/cards/InfoCard";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdAttachMoney, MdClear, MdInfoOutline } from "react-icons/md";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import { StyledModal } from "./styles";

interface ChangeQuotaModalProps {
  portalId?: string;
  totalBalance: number;
  paymentMethod: string;
  paymentMethodName: string;
  onCloseModal: () => void;
  onConfirm: (newQuota: number | "") => void;
}

function ChangeQuotaModal(props: ChangeQuotaModalProps) {
  const {
    portalId = "modals",
    totalBalance,
    paymentMethod,
    paymentMethodName,
    onCloseModal,
    onConfirm,
  } = props;

  const [newQuota, setNewQuota] = useState<number | "">();

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    setNewQuota(isNaN(parsedValue) ? "" : parsedValue);
  };

  const handleConfirm = () => {
    newQuota && onConfirm(newQuota);
    onCloseModal();
  };

  const paymentMethodOptions: ISelectOption[] = [
    { id: paymentMethod, value: paymentMethodName },
  ];

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
            <Text
              type="title"
              appearance="dark"
              size={isMobile ? "small" : "medium"}
              weight="bold"
            >
              Cambiar cuota
            </Text>

            <Icon
              appearance="dark"
              icon={<MdClear />}
              onClick={onCloseModal}
              cursorHover={true}
              size="24px"
              spacing="narrow"
            />
          </Stack>

          <Text type="body" size="medium" appearance="gray">
            Cambia el valor de la cuota de tu ahorro programado.
          </Text>
        </Stack>

        <Divider dashed />

        <InfoCard
          title="Recuerda que si el método de pago es un descuento de nómina, entonces el cambio podrá aplicarse en el siguiente período de nómina."
          appearance="help"
          icon={<MdInfoOutline />}
        />

        <Stack direction="column" gap={inube.spacing.s200}>
          <TextField
            id="totalBalance"
            name="totalBalance"
            label="Saldo total"
            placeholder=""
            value={currencyFormat(totalBalance, false)}
            isFullWidth
            size="compact"
            iconAfter={
              <Icon
                icon={<MdAttachMoney />}
                appearance="dark"
                size="18px"
                spacing="narrow"
              />
            }
            readOnly
          />

          <Select
            id="paymentMethod"
            name="paymentMethod"
            label="Método de pago"
            placeholder=""
            options={paymentMethodOptions}
            value={paymentMethod}
            isFullWidth
            size="compact"
            readOnly
          />

          <TextField
            id="newQuota"
            name="newQuota"
            placeholder="Ingresa el valor de la cuota"
            label="Nuevo valor de la cuota"
            value={newQuota || ""}
            isFullWidth
            size="compact"
            type="number"
            onChange={handleChangeWithCurrency}
            iconAfter={
              <Icon
                icon={<MdAttachMoney />}
                appearance="dark"
                size="18px"
                spacing="narrow"
              />
            }
          />
        </Stack>

        <Stack
          justifyContent="flex-end"
          alignItems="center"
          gap={inube.spacing.s150}
        >
          <Button spacing="compact" variant="outlined" onClick={onCloseModal}>
            Cancelar
          </Button>

          <Button
            spacing="compact"
            onClick={handleConfirm}
            disabled={!newQuota}
          >
            Cambiar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ChangeQuotaModal };
export type { ChangeQuotaModalProps };
