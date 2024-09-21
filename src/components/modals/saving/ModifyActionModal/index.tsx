import { Select } from "@design/input/Select";
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
import { MdClear } from "react-icons/md";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";
import { StyledModal } from "./styles";

interface ModifyActionModalProps {
  portalId?: string;
  shareMaturity: string;
  onCloseModal: () => void;
  onConfirm: (newShareMaturity: string) => void;
}

function ModifyActionModal(props: ModifyActionModalProps) {
  const { portalId = "modals", shareMaturity, onCloseModal, onConfirm } = props;

  const [newShareMaturity, setNewShareMaturity] = useState(shareMaturity);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewShareMaturity(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(newShareMaturity);
    onCloseModal();
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
              Modificar la acción al vencimiento
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
            Modifica la decisión tomada cuando se vence tu ahorro programado.
          </Text>
        </Stack>

        <Divider dashed />

        <Stack direction="column" gap={inube.spacing.s200}>
          <Select
            id="shareMaturity"
            name="shareMaturity"
            label="Acción al vencimiento"
            value={newShareMaturity || ""}
            options={shareMaturityDM.options}
            isFullWidth
            size="compact"
            onChange={handleChange}
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
            disabled={newShareMaturity === shareMaturity}
          >
            Modificar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ModifyActionModal };
export type { ModifyActionModalProps };
