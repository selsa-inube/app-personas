import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledDivider, StyledModal } from "./styles";

interface CommitmentsSavingModalProps {
  portalId: string;
  products: React.JSX.Element;
  onCloseModal: () => void;
}

function CommitmentsSavingModal(props: CommitmentsSavingModalProps) {
  const { portalId, products, onCloseModal } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Compromisos de ahorro
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
            Compromisos ligados a la cuenta
          </Text>
        </Stack>

        <StyledDivider dashed />
        <Stack direction="column" gap="s150">
          {products}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { CommitmentsSavingModal };
export type { CommitmentsSavingModalProps };
