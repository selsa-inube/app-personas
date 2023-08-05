import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";

import { StyledContainerLink, StyledBreadcrumbMenuLink } from "./styles";
import { size, SizeType } from "@ptypes/design.types";

export interface IBreadcrumbMenuLinkProps {
  label: string;
  path: string;
  id: string;
  typo?: SizeType;
}

const defaultTypo: SizeType = "large";

const BreadcrumbMenuLink = (props: IBreadcrumbMenuLinkProps) => {
  const { label, path, id, typo = defaultTypo } = props;
  const transformedTypos = size.includes(typo) ? typo : defaultTypo;
  return (
    <StyledBreadcrumbMenuLink to={path}>
      <StyledContainerLink id={id}>
        <Stack alignItems="center">
          <Text type="label" size={transformedTypos} padding="8px 12px">
            {label}
          </Text>
        </Stack>
      </StyledContainerLink>
    </StyledBreadcrumbMenuLink>
  );
};

export { BreadcrumbMenuLink };
