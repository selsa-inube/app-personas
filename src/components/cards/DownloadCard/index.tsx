import { Button, Stack, Text } from "@inubekit/inubekit";
import { StyledCardContainer } from "./styles";

interface DownloadCardProps {
  id: string;
  title: string;
  onclick?: () => void;
}

function DownloadCard(props: DownloadCardProps) {
  const { id, title, onclick } = props;

  return (
    <StyledCardContainer key={id}>
      <Text type="title" size="medium" weight="bold">
        {title}
      </Text>

      <Stack justifyContent="flex-end" width="100%">
        <Button onClick={onclick} spacing="compact">
          Descargar
        </Button>
      </Stack>
    </StyledCardContainer>
  );
}

export { DownloadCard };
export type { DownloadCardProps };
