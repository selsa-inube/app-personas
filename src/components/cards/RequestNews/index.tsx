import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Icon, Stack, Tag, Text } from "@inubekit/inubekit";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { StyledContainer, StyledStickyContainer } from "./styles";
import { INew } from "./types";

interface RequestNewsProps {
  news: INew[];
}

function RequestNews(props: RequestNewsProps) {
  const { news } = props;

  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <StyledStickyContainer>
      <Stack direction="column" gap={inube.spacing.s300} width="100%">
        {isDesktop && (
          <Text type="title" size="medium" appearance="gray">
            Novedades
          </Text>
        )}

        <StyledContainer>
          {news.map((newItem, index) => (
            <Stack alignItems="center" gap={inube.spacing.s150} key={index}>
              <Icon
                icon={newItem.icon}
                spacing="narrow"
                appearance="dark"
                size="20px"
              />

              <Stack
                direction="column"
                gap={inube.spacing.s050}
                alignItems="flex-start"
              >
                <Text type="body" size="small" appearance="gray">
                  {formatPrimaryTimestamp(newItem.date, true)}
                </Text>

                <Text type="body" size="small">
                  {newItem.description}
                </Text>

                {newItem.tag && (
                  <Tag
                    label={newItem.tag.label}
                    appearance={newItem.tag.appearance}
                  />
                )}
              </Stack>
            </Stack>
          ))}
        </StyledContainer>
      </Stack>
    </StyledStickyContainer>
  );
}

export { RequestNews };
export type { RequestNewsProps };
