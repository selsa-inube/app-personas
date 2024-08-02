import { Text } from "@design/data/Text";

import { StyledBreadcrumbMenuLink, StyledContainerLink } from "./styles";
import { breadcrumbSize, BreadcrumbSizeType } from "../types";
import { Stack } from "@inubekit/stack";

interface BreadcrumbMenuLinkProps {
  label: string;
  path: string;
  id: string;
  typo?: BreadcrumbSizeType;
}

function BreadcrumbMenuLink(props: BreadcrumbMenuLinkProps) {
  const { label, path, id, typo = "small" } = props;
  const transformedTypos = breadcrumbSize.includes(typo) ? typo : "small";
  return (
    <StyledBreadcrumbMenuLink to={path}>
      <StyledContainerLink id={id}>
        <Stack alignItems="center">
          <Text type="label" size={transformedTypos}>
            {label}
          </Text>
        </Stack>
      </StyledContainerLink>
    </StyledBreadcrumbMenuLink>
  );
}

export { BreadcrumbMenuLink };
export type { BreadcrumbMenuLinkProps };
