import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Button, Icon, Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdAssignment, MdCheckCircle, MdOutlineHouse } from "react-icons/md";
import { StyledModal } from "./styles";

interface RequestReceivedModalProps {
  portalId: string;
  titleType: string;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
}

function RequestReceivedModal(props: RequestReceivedModalProps) {
  const { portalId, titleType, onRedirectToHome, onRedirectToRequests } = props;

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
          ¡{titleType} recibida!
        </Text>
        <Text
          type="body"
          size={isMobile ? "medium" : "large"}
          textAlign="center"
        >
          Si lo deseas, puedes consultar el estado de tu{" "}
          {titleType.toLowerCase()} y sus detalles.
        </Text>
        <Stack
          direction={isMobile ? "column-reverse" : "row"}
          width="100%"
          gap={inube.spacing.s100}
          justifyContent="center"
        >
          <Button
            appearance="gray"
            onClick={onRedirectToHome}
            spacing="compact"
            variant="outlined"
            iconBefore={<MdOutlineHouse />}
            fullwidth={isMobile}
          >
            Volver al inicio
          </Button>
          <Button
            appearance="primary"
            onClick={onRedirectToRequests}
            spacing="compact"
            iconBefore={<MdAssignment />}
            fullwidth={isMobile}
          >
            Ver {titleType.toLowerCase()}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { RequestReceivedModal };
