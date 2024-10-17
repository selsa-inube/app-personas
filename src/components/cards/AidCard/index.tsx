import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { IDomainType } from "@ptypes/domain.types";
import { useNavigate } from "react-router-dom";
import { StyledCardContainer } from "./styles";

interface AidCardProps {
  id: string;
  title: string;
  type?: IDomainType;
}

function AidCard(props: AidCardProps) {
  const { id, title, type } = props;

  const navigate = useNavigate();

  const goToAid = () => {
    navigate(`/aids/${id}`, {
      state: { id, title, type },
    });
  };

  return (
    <StyledCardContainer>
      <Text type="title" size="medium" weight="bold">
        {title}
      </Text>

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
