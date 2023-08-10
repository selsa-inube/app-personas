import {
  AppearanceType,
  ShapeType,
  SpacingType,
  VariantType,
} from "@ptypes/design.types";
import { StyledIcon } from "./styles";

interface IconProps {
  icon: React.JSX.Element;
  appearance?: AppearanceType;
  spacing?: SpacingType;
  variant?: VariantType;
  shape?: ShapeType;
  size?: string;
  cursorHover?: boolean;
  parentHover?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function Icon(props: IconProps) {
  const {
    icon,
    appearance = "primary",
    spacing = "wide",
    variant = "none",
    shape = "rectangle",
    size = "24px",
    cursorHover = false,
    parentHover = false,
    disabled = false,
    onClick,
  } = props;

  return (
    <StyledIcon
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      shape={shape}
      size={size}
      cursorHover={cursorHover}
      parentHover={parentHover}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </StyledIcon>
  );
}

export { Icon };
export type { IconProps };
