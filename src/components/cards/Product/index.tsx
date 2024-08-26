import { SkeletonIcon, SkeletonLine } from "@inubekit/skeleton";

import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "src/model/entity/product";
import { StyledProduct, StyledSkeletonContainer } from "./styles";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { ITag, Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";

interface ProductProps {
  title?: string;
  description?: string;
  icon?: React.JSX.Element;
  attributes?: IAttribute[];
  breakpoints?: Record<string, number>;
  tags?: ITag[];
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
        <Stack gap={inube.spacing.s100} alignItems="center">
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

          <Stack direction="column" gap={inube.spacing.s025}>
            {loading ? (
              <Stack direction="column" gap={inube.spacing.s050} width="100px">
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
                  <Stack
                    gap={!isMobile ? inube.spacing.s100 : inube.spacing.s0}
                    alignItems="center"
                  >
                    <Text size="small" appearance="gray">
                      {!isMobile && description}
                    </Text>
                    <Stack gap={inube.spacing.s050}>
                      {tags.length > 0 &&
                        tags.map((tag) => (
                          <Tag {...tag} key={tag.label} weight="strong" />
                        ))}
                    </Stack>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
        {loading ? (
          <StyledSkeletonContainer $isMobile={isMobile}>
            <Stack direction="column" gap={inube.spacing.s050}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
            <Stack direction="column" gap={inube.spacing.s050}>
              <SkeletonLine animated />
              <SkeletonLine animated />
            </Stack>
            <Stack direction="column" gap={inube.spacing.s050}>
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
                  <Stack
                    key={attribute.label}
                    direction="column"
                    gap={inube.spacing.s025}
                  >
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
