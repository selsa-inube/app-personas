import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Tag, TagProps } from "@design/data/Tag";
import { Stack } from "@design/layout/Stack";
import { Grid } from "@design/layout/Grid";

import { StyledProduct } from "./styles";
import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "./types";

interface ProductProps {
  title?: string;
  description?: string;
  icon: React.JSX.Element;
  attributes: IAttribute[];
  breakpoints?: Record<string, number>;
  tags: TagProps[];
  empty?: boolean;
}

function Product(props: ProductProps) {
  const {
    title = "",
    description = "",
    icon,
    attributes = [],
    breakpoints = {},
    tags = [],
    empty = false,
  } = props;

  const mobile = useMediaQuery("(max-width: 450px)");

  const attributeQueries = Object.keys(breakpoints);
  const attributeMediaQueries = useMediaQueries(attributeQueries) as {
    [key: string]: boolean;
  };
  const index = attributeQueries.findIndex(
    (query) => attributeMediaQueries[query] === true
  );
  const visibleAttributes = attributes.slice(
    0,
    breakpoints[attributeQueries[index]]
  );

  return (
    <StyledProduct empty={empty}>
      <Grid templateColumns="auto 1fr" gap="s100">
        <Stack gap="s100" alignItems="center">
          <Icon
            icon={icon}
            variant="filled"
            spacing="compact"
            appearance={empty ? "gray" : "primary"}
          />
          <Stack direction="column" gap="s025">
            <Text
              type={mobile ? "label" : "title"}
              size={mobile ? "medium" : "small"}
              appearance={empty ? "gray" : "dark"}
            >
              {!empty ? title : "No tienes productos"}
            </Text>
            {!empty && (
              <Stack gap={!mobile ? "s100" : "0px"} alignItems="center">
                <Text size="small" appearance="gray">
                  {!mobile && description}
                </Text>
                <Stack gap="s050">
                  {tags.length > 0 &&
                    tags.map((tag) => <Tag {...tag} key={tag.label} />)}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        {!empty && (
          <Grid
            autoFlow="column"
            templateColumns={`repeat(${visibleAttributes.length}, minmax(100px, max-content))`}
            gap="s300"
            justifyContent="end"
            alignItems="center"
            alignContent="center"
          >
            {visibleAttributes.map((attribute) => (
              <Stack key={attribute.label} direction="column" gap="s025">
                <Text
                  type="label"
                  size={mobile ? "small" : "medium"}
                  textAlign="center"
                >
                  {attribute.label}
                </Text>
                <Text size="small" textAlign="center" appearance="gray">
                  {attribute.value}
                </Text>
              </Stack>
            ))}
          </Grid>
        )}
      </Grid>
    </StyledProduct>
  );
}

export type { ProductProps };
export { Product };
