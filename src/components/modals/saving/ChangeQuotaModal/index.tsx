import { BoxAttribute } from "@components/cards/BoxAttribute";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdAttachMoney, MdClear } from "react-icons/md";
import { ICommitment } from "src/model/entity/product";
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";
import { StyledModal } from "./styles";

interface ChangeQuotaModalProps {
  portalId?: string;
  loading?: boolean;
  commitments: ICommitment[];
  onCloseModal: () => void;
  onConfirm: (newQuota: number | "") => void;
}

function ChangeQuotaModal(props: ChangeQuotaModalProps) {
  const {
    portalId = "modals",
    loading,
    commitments,
    onCloseModal,
    onConfirm,
  } = props;

  const [newQuota, setNewQuota] = useState<number | "">("");
  const [quotas, setQuotas] = useState({
    currentQuota: "",
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
    if (commitments.length === 0) return;

    const currentQuota =
      extractAttribute(
        commitments[0].attributes,
        "commitment_value",
      )?.value.toString() || "";

    setQuotas({
      currentQuota,
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
            value={quotas.currentQuota}
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
