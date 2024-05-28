import { Text } from "@design/data/Text";
import { StyledCardContainer } from "./styles";
import { Stack } from "@design/layout/Stack";
import { Button } from "@design/input/Button";
import { useMediaQuery } from "@hooks/useMediaQuery";

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
    <StyledCardContainer isMobile={isMobile}>
      <Text type="title" size="medium">
        {name}
      </Text>
      <Stack gap="s050">
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
