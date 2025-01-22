import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Spinner } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { StyledLoadingCard } from "./styles";

interface LoadingModalProps {
  title: string;
  message: string;
}

function LoadingModal(props: LoadingModalProps) {
  const { title, message } = props;

  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <Blanket>
      <StyledLoadingCard $isMobile={isMobile}>
        <Spinner appearance="primary" size="large" transparent={false} />
        <Text type="title" size="large" weight="bold">
          {title}
        </Text>
        <Text type="body" size="large" appearance="gray" textAlign="center">
          {message}
        </Text>
      </StyledLoadingCard>
    </Blanket>
  );
}

export { LoadingModal };
