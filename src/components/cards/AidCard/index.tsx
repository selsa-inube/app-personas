import { Text } from "@design/data/Text";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StyledCardContainer } from "./styles";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

interface AidCardProps {
  id: string;
  title: string;
  description: string;
}

function AidCard(props: AidCardProps) {
  const { id, title, description } = props;

  const navigate = useNavigate();

  const goToAid = () => {
    navigate(`/aids/${id}`);
  };

  return (
    <StyledCardContainer>
      <Stack justifyContent="space-between" alignItems="center">
        <Text type="title" size="medium">
          {title}
        </Text>
        <Icon
          icon={<MdChevronRight />}
          appearance="primary"
          size="24px"
          spacing="narrow"
          cursorHover
          onClick={goToAid}
        />
      </Stack>
      <Text type="body" size="medium" appearance="gray">
        {description}
      </Text>
    </StyledCardContainer>
  );
}

export { AidCard };
export type { AidCardProps };
