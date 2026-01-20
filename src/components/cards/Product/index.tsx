import { SkeletonLine, Tag } from "@inubekit/inubekit";
import { inube } from "@design/tokens";
import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ITag, Stack, Text } from "@inubekit/inubekit";
import { IAttribute } from "src/model/entity/product";
import { StyledProduct } from "./styles";

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
  type?: "default" | "compact";
}

function Product(props: ProductProps) {
  const {
    title = "",
    description = "",
    attributes = [],
    breakpoints = {},
    tags = [],
    empty,
    navigateTo = "",
    loading,
    type = "default",
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
      <Stack
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? inube.spacing.s100 : undefined}
        alignItems={isMobile ? "initial" : "center"}
        justifyContent={isMobile ? "initial" : "space-between"}
      >
        {loading ? (
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={inube.spacing.s050} width="100%">
            <Stack direction="row" width="50%" gap={inube.spacing.s050} alignItems="center">
              <SkeletonLine width="100px" animated />
              <SkeletonLine width="100px" animated />
            </Stack>
            <SkeletonLine width="100px" animated />
          </Stack>
        ) : (
          <>
            <Stack
              gap={inube.spacing.s100}
              justifyContent={isMobile ? "space-between" : "initial"}
              alignItems="center"
            >
              <Text
                type="label" size={isMobile ? "small" : "medium"}
                appearance={empty ? "gray" : "dark"}
                weight="bold"
              >
                {!empty ? title : "Actualmente no tienes productos"}
              </Text>
              <Text
                type="label"
                size={isMobile ? "small" : "medium"}
                appearance="gray"
                weight="bold"
              >
                {description}
              </Text>
              {
                tags.length > 0 &&
                <Tag
                  appearance="danger"
                  label="Vencido"
                  displayIcon
                />
              }
            </Stack>
            <Stack direction="row" gap={inube.spacing.s300} justifyContent="flex-end">
              {visibleAttributes.map((attribute) => (
                <Stack
                  key={attribute.label}
                  direction={(isMobile || type === "compact") ? "row" : "column"}
                  gap={inube.spacing.s100}
                  justifyContent="flex-end"
                >
                  <Text
                    type="label"
                    size={isMobile ? "small" : "medium"}
                    appearance="gray"
                    weight="normal"
                    textAlign="center"
                  >
                    {attribute.label}:
                  </Text>
                  <Text
                    type="body"
                    size="small"
                    appearance="dark"
                    weight="normal"
                    textAlign="center"
                  >
                    {String(attribute.value)}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </StyledProduct>
  );
}

export { Product };
export type { ProductProps };
