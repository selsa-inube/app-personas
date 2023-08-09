import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";

import { StyledContainerLink, StyledBreadcrumbMenuLink } from "./styles";
import { size, SizeType } from "@ptypes/design.types";

interface BreadcrumbMenuLinkProps {
  label: string;
  path: string;
  id: string;
  typo?: SizeType;
}

function BreadcrumbMenuLink(props: BreadcrumbMenuLinkProps) {
  const { label, path, id, typo = "large" } = props;
  const transformedTypos = size.includes(typo) ? typo : "large";
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
}

export type { BreadcrumbMenuLinkProps };
export { BreadcrumbMenuLink };
