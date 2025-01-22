import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Stack, Text } from "@inubekit/inubekit";
import { StyledCardContainer } from "./styles";

interface UserCardProps {
  name: string;
  identificationType: string;
  identification: string;
  onClick: () => void;
}

function UserCard(props: UserCardProps) {
  const { name, identificationType, identification, onClick } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledCardContainer $isMobile={isMobile}>
      <Text type="title" size="medium">
        {name}
      </Text>
      <Stack gap={inube.spacing.s050}>
        <Text size="small" appearance="gray">
          {identificationType}
        </Text>
        <Text size="small" appearance="gray">
          {identification}
        </Text>
      </Stack>
      <Stack justifyContent="flex-end">
        <Button spacing="compact" variant="none" onClick={onClick}>
          Consultar
        </Button>
      </Stack>
    </StyledCardContainer>
  );
}

export { UserCard };
export type { UserCardProps };
