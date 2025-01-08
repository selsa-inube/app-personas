import { BoxAttribute } from "@components/cards/BoxAttribute";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdAttachMoney, MdClear } from "react-icons/md";
import { IProduct } from "src/model/entity/product";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import { StyledModal } from "./styles";

interface ChangeQuotaModalProps {
  portalId?: string;
  product: IProduct;
  loading?: boolean;
  onCloseModal: () => void;
  onConfirm: (newQuota: number | "") => void;
}

function ChangeQuotaModal(props: ChangeQuotaModalProps) {
  const {
    portalId = "modals",
    product,
    loading,
    onCloseModal,
    onConfirm,
  } = props;

  const [newQuota, setNewQuota] = useState<number | "">("");
  const [quotas, setQuotas] = useState({
    currentQuota: 0,
    minQuota: 0,
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    setNewQuota(isNaN(parsedValue) ? "" : parsedValue);
  };

  const handleConfirm = () => {
    onConfirm(newQuota);
    onCloseModal();
  };

  const getQuotaValues = () => {
    if (!product || !product.movements || product.movements.length === 0)
      return;

    const frequencyMap = product.movements.reduce<Record<number, number>>(
      (acc, item) => {
        acc[item.totalValue] = (acc[item.totalValue] || 0) + 1;
        return acc;
      },
      {},
    );

    const currentQuota = Object.entries(frequencyMap).reduce(
      (mostFrequent, [value, frequency]) =>
        frequency > mostFrequent[1] ? [Number(value), frequency] : mostFrequent,
      [0, 0],
    )[0];

    setQuotas({
      currentQuota,
      minQuota: 0,
    });
  };

  useEffect(() => {
    getQuotaValues();
  }, []);

  const validateCurrencyField = (value: number | "") => {
    return typeof value === "number" ? currencyFormat(value, false) : "";
  };

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

        <Stack direction="column" gap={inube.spacing.s200}>
          <BoxAttribute
            label="Valor actual de la cuota:"
            value={currencyFormat(quotas.currentQuota)}
          />

          <BoxAttribute
            label="Valor cuota mínima:"
            value={currencyFormat(quotas.minQuota)}
          />

          <TextField
            id="newQuota"
            name="newQuota"
            placeholder="Ingresa el valor de la cuota"
            label="Nuevo valor de la cuota"
            value={validateCurrencyField(newQuota)}
            isFullWidth
            size="compact"
            type="text"
            onChange={handleChangeWithCurrency}
            iconAfter={
              <Icon
                icon={<MdAttachMoney />}
                appearance="dark"
                size="18px"
                spacing="narrow"
              />
            }
            state={
              newQuota && newQuota < quotas.minQuota ? "invalid" : undefined
            }
            errorMessage={
              newQuota && newQuota < quotas.minQuota
                ? "El valor es menor a la cuota mínima permitida"
                : undefined
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
            loading={loading}
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
