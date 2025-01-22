import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Icon, Stack, Text } from "@inubekit/inubekit";
import { MdOutlineStarBorder } from "react-icons/md";
import { StyledCardContainer } from "./styles";

interface RequestCardProps {
  title: string;
  descriptions: string[];
  actionText: string;
  onClick: () => void;
}

function RequestCard(props: RequestCardProps) {
  const { title, descriptions, actionText, onClick } = props;

  const isMobile = useMediaQuery("(max-width: 500px)");

  const withListIndicators = Object.entries(descriptions).length > 1;

  return (
    <StyledCardContainer>
      <Stack direction="column" width="100%" gap={inube.spacing.s250}>
        <Text type="title" size="medium">
          {title}
        </Text>

        <Stack direction="column" gap={inube.spacing.s150}>
          {descriptions.map((description, index) => (
            <Stack gap={inube.spacing.s100} key={index}>
              {withListIndicators ? (
                <>
                  <Icon
                    icon={<MdOutlineStarBorder />}
                    appearance="primary"
                    size="12px"
                    spacing="narrow"
                  />
                  <Text
                    type="body"
                    size={isMobile ? "small" : "medium"}
                    appearance="gray"
                  >
                    {description}
                  </Text>
                </>
              ) : (
                <Text
                  type="body"
                  size={isMobile ? "small" : "medium"}
                  appearance="gray"
                >
                  {description}
                </Text>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Button onClick={onClick} spacing="compact">
        {actionText}
      </Button>
    </StyledCardContainer>
  );
}

export { RequestCard };
export type { RequestCardProps };
