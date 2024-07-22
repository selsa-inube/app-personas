import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { SkeletonIcon, SkeletonLine } from "@inubekit/skeleton";

import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "src/model/entity/product";
import { StyledProduct, StyledSkeletonContainer } from "./styles";
import { Icon } from "@inubekit/icon";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";

interface ProductProps {
  title?: string;
  description?: string;
  icon?: React.JSX.Element;
  attributes?: IAttribute[];
  breakpoints?: Record<string, number>;
  tags?: TagProps[];
  empty?: boolean;
  navigateTo?: string;
  loading?: boolean;
}

function Product(props: ProductProps) {
  const {
    title = "",
    description = "",
    icon,
    attributes = [],
    breakpoints = {},
    tags = [],
    empty,
    navigateTo = "",
    loading,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  const attributeQueries = Object.keys(breakpoints);
  const attributeMediaQueries = useMediaQueries(attributeQueries);
  const index = attributeQueries.findIndex(
    (query) => attributeMediaQueries[query] === true,
  );
  const visibleAttributes = attributes.slice(
    -breakpoints[attributeQueries[index]],
  );

  return (
    <StyledProduct $empty={empty} to={navigateTo}>
      <Grid templateColumns="auto 1fr" gap={inube.spacing.s100}>
        <Stack gap="s100" alignItems="center">
          {loading ? (
            <SkeletonIcon animated size="32px" />
          ) : (
            icon && (
              <Icon
                icon={icon}
                size="34px"
                variant="filled"
                spacing="compact"
                appearance={empty ? "gray" : "primary"}
              />
            )
          )}

          <Stack direction="column" gap="s025">
            {loading ? (
              <Stack direction="column" gap="s050" width="100px">
                <SkeletonLine animated />
                <SkeletonLine animated />
              </Stack>
            ) : (
              <>
                <Text
                  type={isMobile ? "label" : "title"}
                  size={isMobile ? "medium" : "small"}
                  appearance={empty ? "gray" : "dark"}
                >
                  {!empty ? title : "No tienes productos"}
                </Text>
                {!empty && (
                  <Stack gap={!isMobile ? "s100" : "0px"} alignItems="center">
                    <Text size="small" appearance="gray">
                      {!isMobile && description}
                    </Text>
                    <Stack gap="s050">
                      {tags.length > 0 &&
                        tags.map((tag) => <Tag {...tag} key={tag.label} />)}
                    </Stack>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
        {loading ? (
          <StyledSkeletonContainer $isMobile={isMobile}>
            <Stack direction="column" gap="s050">
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
            <Stack direction="column" gap="s050">
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
            <Stack direction="column" gap="s050">
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
          </StyledSkeletonContainer>
        ) : (
          <>
            {!empty && (
              <Grid
                autoFlow="column"
                templateColumns={`repeat(${visibleAttributes.length}, minmax(100px, max-content))`}
                gap={inube.spacing.s300}
                justifyContent="end"
                alignItems="center"
                alignContent="center"
              >
                {visibleAttributes.map((attribute) => (
                  <Stack key={attribute.label} direction="column" gap="s025">
                    <Text
                      type="label"
                      size={isMobile ? "small" : "medium"}
                      textAlign="center"
                    >
                      {attribute.label}
                    </Text>
                    <Text size="small" textAlign="center" appearance="gray">
                      {String(attribute.value)}
                    </Text>
                  </Stack>
                ))}
              </Grid>
            )}
          </>
        )}
      </Grid>
    </StyledProduct>
  );
}

export { Product };
export type { ProductProps };
