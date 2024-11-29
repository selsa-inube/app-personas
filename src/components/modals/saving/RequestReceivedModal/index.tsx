import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { createPortal } from "react-dom";
import { MdAssignment, MdCheckCircle, MdOutlineHouse } from "react-icons/md";
import { StyledModal } from "./styles";

interface RequestReceivedModalProps {
  portalId: string;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
}

function RequestReceivedModal(props: RequestReceivedModalProps) {
  const { portalId, onRedirectToHome, onRedirectToRequests } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Icon appearance="success" icon={<MdCheckCircle />} size="42px" />
        <Text type="title" size={isMobile ? "medium" : "large"} weight="bold">
          ¡Solicitud recibida!
        </Text>
        <Text
          type="body"
          size={isMobile ? "medium" : "large"}
          textAlign="center"
        >
          Si lo deseas, puedes consultar el estado de tu solicitud y sus
          detalles.
        </Text>
        <Stack justifyContent="flex-end" gap={inube.spacing.s100}>
          <Button
            appearance="gray"
            onClick={onRedirectToHome}
            spacing="compact"
            variant="outlined"
            iconBefore={<MdOutlineHouse />}
          >
            Volver al inicio
          </Button>
          <Button
            appearance="primary"
            onClick={onRedirectToRequests}
            spacing="compact"
            iconBefore={<MdAssignment />}
          >
            Ver solicitud
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { RequestReceivedModal };
