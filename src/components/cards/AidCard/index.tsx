import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useNavigate } from "react-router-dom";
import { StyledCardContainer } from "./styles";

interface AidCardProps {
  id: string;
  title: string;
  description: string;
}

function AidCard(props: AidCardProps) {
  const { id, title, description } = props;

  const navigate = useNavigate();

  const goToAid = () => {
    navigate(`/aids/${id}`, {
      state: { id, title },
    });
  };

  return (
    <StyledCardContainer>
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack justifyContent="space-between" alignItems="center">
          <Text type="title" size="medium" weight="bold">
            {title}
          </Text>
        </Stack>
        <Text type="body" size="medium" appearance="gray">
          {description}
        </Text>
      </Stack>

      <Stack justifyContent="flex-end" width="100%">
        <Button onClick={goToAid} spacing="compact">
          Solicitar
        </Button>
      </Stack>
    </StyledCardContainer>
  );
}

export { AidCard };
export type { AidCardProps };
