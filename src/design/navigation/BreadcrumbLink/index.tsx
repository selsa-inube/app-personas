import { Text } from "@design/data/Text";
import { size, SizeType } from "@ptypes/design.types";
import { StyledContainerLink, StyledBreadcrumbLink } from "./styles";

export interface IBreadcrumbLinkProps {
  isActive?: boolean;
  label: string;
  path: string;
  id: string;
  typo?: SizeType;
  cursorHover?: boolean;
  handleClick?: () => void;
}

const defaultTypo: SizeType = "large";
const defaultIsActive: boolean = false;

const BreadcrumbLink = (props: IBreadcrumbLinkProps) => {
  const {
    isActive = defaultIsActive,
    label,
    path,
    id,
    cursorHover = false,
    typo = defaultTypo,
    handleClick,
  } = props;

  const transformedTypos: SizeType = size.includes(typo) ? typo : defaultTypo;
  const transformedIsActive: boolean =
    typeof isActive === "boolean" ? isActive : defaultIsActive;

  return (
    <StyledContainerLink id={id} onClick={handleClick}>
      <Text type="label" size={transformedTypos}>
        <StyledBreadcrumbLink
          to={path}
          data-is-active={transformedIsActive}
          cursorHover={cursorHover}
        >
          {label}
        </StyledBreadcrumbLink>
      </Text>
    </StyledContainerLink>
  );
};

export { BreadcrumbLink };
