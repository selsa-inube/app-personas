import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  IButtonAppearance,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";

interface DecisionModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  loading?: boolean;
  portalId: string;
  cancelText?: string;
  onCloseModal: () => void;
  onClick: () => void;
}

function DecisionModal(props: DecisionModalProps) {
  const {
    title,
    description,
    appearance = "primary",
    actionText,
    loading,
    portalId,
    cancelText = "Cancelar",
    onCloseModal,
    onClick,
  } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const handleActionClick = () => {
    if (!loading) onClick();
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text
            type="title"
            appearance="dark"
            weight="bold"
            size={isMobile ? "small" : "medium"}
          >
            {title}
          </Text>
          <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
        </Stack>
        <Text type="body" appearance="gray" size={isMobile ? "small" : "large"}>
          {description}
        </Text>
        <Stack justifyContent="flex-end" gap={inube.spacing.s100}>
          <Button
            appearance="gray"
            onClick={onCloseModal}
            spacing="compact"
            variant="outlined"
          >
            {cancelText}
          </Button>
          <Button
            appearance={appearance}
            loading={loading}
            onClick={handleActionClick}
            spacing="compact"
          >
            {actionText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { DecisionModal };
export type { DecisionModalProps };
