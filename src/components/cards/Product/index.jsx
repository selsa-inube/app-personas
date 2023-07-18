import PropTypes from "prop-types";

import { Icon } from "../../../design/data/Icon";
import { Text } from "../../../design/data/Text";
import { Tag } from "../../../design/data/Tag";
import { Stack } from "../../../design/layout/Stack";
import { Grid } from "../../../design/layout/Grid";

import { appearance } from "../../../design/data/Tag/props";
import { inube } from "../../../design/tokens";

import { StyledProduct, StyledGrid } from "./styles";

function Product(props) {
  const {
    title,
    description,
    icon,
    attributes = [],
    tags = [],
    empty = false,
  } = props;

  return (
    <StyledProduct empty={empty}>
      <StyledGrid>
        <Stack gap={inube.spacing.s100} alignItems="center">
          <Icon
            icon={icon}
            variant="filled"
            spacing="compact"
            appearance={empty ? "gray" : "primary"}
          />
          <Stack direction="column" gap={inube.spacing.s025}>
            <Text
              type="title"
              size="small"
              appearance={empty ? "gray" : "dark"}
            >
              {!empty ? title : "No tienes productos"}
            </Text>
            {!empty && (
              <Stack gap={inube.spacing.s100} alignItems="center">
                <Text size="small" appearance="gray">
                  {description}
                </Text>
                <Stack gap={inube.spacing.s050}>
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
            templateColumns={`repeat(${attributes.length}, minmax(100px, max-content))`}
            gap={inube.spacing.s300}
            justifyContent="end"
            alignItems="center"
            alignContent="center"
          >
            {attributes.map((attribute) => (
              <Stack
                key={attribute.label}
                direction="column"
                gap={inube.spacing.s025}
              >
                <Text type="label" size="medium" textAlign="center">
                  {attribute.label}
                </Text>
                <Text size="small" textAlign="center" appearance="gray">
                  {attribute.value}
                </Text>
              </Stack>
            ))}
          </Grid>
        )}
      </StyledGrid>
    </StyledProduct>
  );
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      appearance: PropTypes.oneOf(appearance),
    })
  ),
  empty: PropTypes.bool,
};

export { Product };
