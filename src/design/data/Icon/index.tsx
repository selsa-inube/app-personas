import {
  AppearanceType,
  SpacingType,
  VariantType,
  ShapeType,
} from "src/types/design.types";
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
    >
      {icon}
    </StyledIcon>
  );
}

export { Icon };
export type { IconProps };
