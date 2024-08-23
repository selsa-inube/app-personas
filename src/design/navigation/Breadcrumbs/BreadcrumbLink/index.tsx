import { StyledBreadcrumbLink, StyledContainerLink } from "./styles";
import { breadcrumbSize, BreadcrumbSizeType } from "../types";
import { Text } from "@inubekit/text";

interface BreadcrumbLinkProps {
  isActive?: boolean;
  label: string;
  path?: string;
  id: string;
  typo?: BreadcrumbSizeType;
  cursorHover?: boolean;
  onClick?: () => void;
}

function BreadcrumbLink(props: BreadcrumbLinkProps) {
  const {
    isActive = false,
    label,
    path = "",
    id,
    cursorHover = false,
    typo = "large",
    onClick,
  } = props;

  const transformedTypos: BreadcrumbSizeType = breadcrumbSize.includes(typo)
    ? typo
    : "large";
  const transformedIsActive: boolean =
    typeof isActive === "boolean" ? isActive : false;

  return (
    <StyledContainerLink id={id} onClick={onClick}>
      <Text type="label" size={transformedTypos}>
        <StyledBreadcrumbLink
          to={path}
          $isActive={transformedIsActive}
          $cursorHover={cursorHover}
        >
          {label}
        </StyledBreadcrumbLink>
      </Text>
    </StyledContainerLink>
  );
}

export { BreadcrumbLink };
export type { BreadcrumbLinkProps };
