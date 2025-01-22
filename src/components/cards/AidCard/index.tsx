import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";
import { SkeletonLine, Stack, Text } from "@inubekit/inubekit";
import { IDomainType } from "@ptypes/domain.types";
import { useNavigate } from "react-router-dom";
import { OutlineCard } from "../OutlineCard";
import { StyledCardContainer } from "./styles";

interface AidCardProps {
  id: string;
  title: string;
  type?: IDomainType;
  loading?: boolean;
}

function AidCard(props: AidCardProps) {
  const { id, title, type, loading } = props;

  const navigate = useNavigate();

  const goToAid = () => {
    navigate(`/aids/${id}`, {
      state: { id, title, type },
    });
  };

  if (loading) {
    return (
      <OutlineCard>
        <Stack
          direction="column"
          gap={inube.spacing.s200}
          padding={inube.spacing.s250}
          width="100%"
        >
          <SkeletonLine width="100%" animated />
          <Stack justifyContent="flex-end">
            <SkeletonLine width="25%" animated />
          </Stack>
        </Stack>
      </OutlineCard>
    );
  }

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
