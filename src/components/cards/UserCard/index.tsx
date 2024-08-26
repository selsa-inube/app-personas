import { StyledCardContainer } from "./styles";
import { Button } from "@design/input/Button";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

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
