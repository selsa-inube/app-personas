import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";

import { StyledBreadcrumbMenuLink, StyledContainerLink } from "./styles";
import { breadcrumbSize, BreadcrumbSizeType } from "../types";

interface BreadcrumbMenuLinkProps {
  label: string;
  path: string;
  id: string;
  typo?: BreadcrumbSizeType;
}

function BreadcrumbMenuLink(props: BreadcrumbMenuLinkProps) {
  const { label, path, id, typo = "large" } = props;
  const transformedTypos = breadcrumbSize.includes(typo) ? typo : "large";
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

export { BreadcrumbMenuLink };
export type { BreadcrumbMenuLinkProps };
