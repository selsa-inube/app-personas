import { StyledIcon } from "./styles";
import { VariantType, ShapeType } from "../../../types/design.types";
import {SpacingType} from "../../../types/spacing.types";
import {AppearanceType} from "../../../types/color.types";

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
    variant='none',
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
