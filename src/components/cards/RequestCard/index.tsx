import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { MdOutlineStarBorder } from "react-icons/md";
import { StyledCardContainer } from "./styles";

interface RequestCardProps {
  title: string;
  descriptions: string[];
  onClick: () => void;
}

function RequestCard(props: RequestCardProps) {
  const { title, descriptions, onClick } = props;

  return (
    <StyledCardContainer>
      <Stack direction="column" width="100%" gap="s200">
        <Text type="title" size="medium">
          {title}
        </Text>

        <Stack direction="column" gap="s150">
          {descriptions.map((description, index) => {
            return (
              <Stack gap="s100" key={index}>
                <Icon
                  icon={<MdOutlineStarBorder />}
                  appearance="primary"
                  size="12px"
                  spacing="none"
                />
                <Text type="body" size="medium" appearance="gray">
                  {description}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      <Button onClick={onClick}>Solicitar</Button>
    </StyledCardContainer>
  );
}

export { RequestCard };
export type { RequestCardProps };
