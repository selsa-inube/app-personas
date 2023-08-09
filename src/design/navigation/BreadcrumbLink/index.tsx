import { Text } from "@design/data/Text";
import { size, SizeType } from "@ptypes/design.types";
import { StyledContainerLink, StyledBreadcrumbLink } from "./styles";

interface BreadcrumbLinkProps {
  isActive?: boolean;
  label: string;
  path?: string;
  id: string;
  typo?: SizeType;
  cursorHover?: boolean;
  handleClick?: () => void;
}

function BreadcrumbLink(props: BreadcrumbLinkProps) {
  const {
    isActive = false,
    label,
    path = "",
    id,
    cursorHover = false,
    typo = "large",
    handleClick,
  } = props;

  const transformedTypos: SizeType = size.includes(typo) ? typo : "large";
  const transformedIsActive: boolean =
    typeof isActive === "boolean" ? isActive : false;

  return (
    <StyledContainerLink id={id} onClick={handleClick}>
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

export type { BreadcrumbLinkProps };
export { BreadcrumbLink };
